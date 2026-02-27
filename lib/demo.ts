/**
 * Demo mode utilities — AGASA-Citoyen
 * 
 * Helpers for blocking mutations and showing feedback in demo mode
 */

/**
 * Check if the current session is in demo mode.
 * Use inside mutation handlers to block real actions.
 */
export function isDemoSession(token: string | null): boolean {
    if (!token) return false;
    return token.startsWith("DEMO_");
}

/**
 * Show a toast message for blocked demo actions.
 * Uses a simple approach with a temporary DOM element.
 */
export function showDemoToast(message = "Action impossible en mode démonstration") {
    if (typeof window === "undefined") return;

    // Remove existing toast if any
    const existing = document.getElementById("demo-toast");
    if (existing) existing.remove();

    const toast = document.createElement("div");
    toast.id = "demo-toast";
    toast.textContent = `🎮 ${message}`;
    toast.style.cssText = `
    position: fixed;
    bottom: 80px;
    left: 50%;
    transform: translateX(-50%);
    background: #1a1a1a;
    color: white;
    padding: 12px 20px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 500;
    z-index: 9999;
    animation: fadeInUp 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transition = "opacity 0.3s ease";
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

/**
 * Guard function — wraps an async action and blocks it in demo mode.
 * Usage: const result = await demoGuard(isDemo, () => mutate(args));
 */
export async function demoGuard<T>(
    isDemo: boolean,
    action: () => Promise<T>,
    message?: string
): Promise<T | null> {
    if (isDemo) {
        showDemoToast(message);
        return null;
    }
    return action();
}
