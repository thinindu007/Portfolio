import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: "#08080A",
          surface: "#111114",
          surface2: "#191A1F",
          border: "rgba(255,255,255,0.08)",
        },
        ink: {
          DEFAULT: "#F3F2EE",
          muted: "#8B8C93",
          faint: "#5A5B62",
        },
        signal: {
          indigo: "#6E7BFF",
          indigoSoft: "#4B54B8",
          teal: "#4CD9C0",
        },
      },
      fontFamily: {
        display: ["'Fraunces'", "serif"],
        sans: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-fade":
          "linear-gradient(to bottom, rgba(110,123,255,0.08), transparent 70%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(110,123,255,0.25)",
        glowSm: "0 0 18px rgba(110,123,255,0.35)",
      },
    },
  },
  plugins: [],
} satisfies Config;
