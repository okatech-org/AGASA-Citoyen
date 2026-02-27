// GPS Utilities — AGASA-Citoyen

export interface GPSPosition {
    latitude: number;
    longitude: number;
    precision?: number;
}

// Libreville par défaut
export const DEFAULT_POSITION: GPSPosition = {
    latitude: 0.4162,
    longitude: 9.4673,
};

/**
 * Obtient la position GPS actuelle du navigateur
 */
export function getCurrentPosition(): Promise<GPSPosition> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("La géolocalisation n'est pas supportée par ce navigateur"));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    precision: position.coords.accuracy,
                });
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        reject(new Error("Permission de géolocalisation refusée"));
                        break;
                    case error.POSITION_UNAVAILABLE:
                        reject(new Error("Position indisponible"));
                        break;
                    case error.TIMEOUT:
                        reject(new Error("Délai de géolocalisation dépassé"));
                        break;
                    default:
                        reject(new Error("Erreur de géolocalisation inconnue"));
                }
            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 30000,
            }
        );
    });
}

/**
 * Calcule la distance (en mètres) entre 2 coordonnées GPS (formule de Haversine)
 */
export function calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
): number {
    const R = 6371000; // rayon de la Terre en mètres
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function toRad(deg: number): number {
    return (deg * Math.PI) / 180;
}

/**
 * Formatte une distance en texte lisible
 */
export function formatDistance(meters: number): string {
    if (meters < 1000) {
        return `${Math.round(meters)} m`;
    }
    return `${(meters / 1000).toFixed(1)} km`;
}

/**
 * Reverse geocoding via Nominatim (OSM gratuit)
 */
export async function reverseGeocode(lat: number, lon: number): Promise<string | null> {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
            {
                headers: { "Accept-Language": "fr" },
            }
        );
        if (!response.ok) return null;
        const data = await response.json();
        return data.display_name || null;
    } catch {
        return null;
    }
}
