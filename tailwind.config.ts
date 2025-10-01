import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import tailwindCssAnimate from "tailwindcss-animate";
import tailwindCssTypography from "@tailwindcss/typography";

export default {
  darkMode: ["class"],
  content: {
    files: [
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/core/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    ],
  },
  theme: {
    extend: {
      animation: {
        "caret-blink": "caret-blink 1.25s ease-out infinite",
        shine: "shine 8s ease-in-out infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          "50": "hsl(var(--muted-50))",
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      fontFamily: {
        sans: ["var(--font-open-sans)"],
      },
      keyframes: {
        "caret-blink": {
          "0%,70%,100%": {
            opacity: "1",
          },
          "20%,50%": {
            opacity: "0",
          },
        },
        shine: {
          from: {
            backgroundPosition: "200% 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
    },
  },
  plugins: [
    tailwindCssAnimate,
    tailwindCssTypography,
    plugin(function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          "-ms-overflow-style": "none",
          "scrollbar-width": "none",
        },
        ".text-heading-large": {
          "font-family": "var(--font-open-sans)",
          "font-size": "24px",
          "font-weight": "600",
          "line-height": "32px",
          "letter-spacing": "0.4",
        },
        ".text-heading-medium-semibold": {
          "font-family": "var(--font-open-sans)",
          "font-size": "18px",
          "font-weight": "600",
          "line-height": "28px",
          "letter-spacing": "0",
        },
        ".text-heading-medium": {
          "font-family": "var(--font-open-sans)",
          "font-size": "18px",
          "font-weight": "600",
          "line-height": "28px",
          "letter-spacing": "0",
        },
        ".text-heading-small": {
          "font-family": "var(--font-open-sans)",
          "font-size": "16px",
          "font-weight": "600",
          "line-height": "16px",
          "letter-spacing": "0.4",
        },
      });
    }),
  ],
} satisfies Config;
