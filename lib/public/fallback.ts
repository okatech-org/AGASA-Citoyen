import type { PublicMetrics } from "@/lib/public/types";

export const PUBLIC_METRICS_FALLBACK: PublicMetrics = {
    etablissementsActifs: 120,
    alertesActives: 8,
    signalements30j: 25,
    manuelsActifs: 6,
    provincesCouvertes: 5,
    updatedAt: Date.now(),
};
