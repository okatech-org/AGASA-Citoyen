import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./lib/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "citoyen-green": "#2E7D32",
                "citoyen-green-light": "#43A047",
                "citoyen-blue": "#1565C0",
                "citoyen-red": "#C62828",
                "citoyen-orange": "#EF6C00",
                "citoyen-yellow": "#F9A825",
                "smiley-5": "#1B5E20",
                "smiley-4": "#43A047",
                "smiley-3": "#FDD835",
                "smiley-2": "#EF6C00",
                "smiley-1": "#C62828",
                "smiley-0": "#212121",
            },
            fontSize: {
                base: "16px",
            },
            minHeight: {
                btn: "48px",
            },
            borderRadius: {
                btn: "16px",
            },
            screens: {
                xs: "320px",
                sm: "375px",
                md: "768px",
                lg: "1024px",
                xl: "1280px",
            },
        },
    },
    plugins: [],
};

export default config;
