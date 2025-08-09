/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#006233", // Vert algérien officiel
          50: "#E6F4EC",
          100: "#C2E5D1",
          200: "#9DD6B5",
          300: "#79C79A",
          400: "#54B87E",
          500: "#2FA963", // Vert plus vif pour CTAs
          600: "#006233", // DEFAULT
          700: "#00502A",
          800: "#003D20",
          900: "#002B16",
        },

        // Rouge algérien pour accents et alertes
        secondary: {
          DEFAULT: "#D21034",
          50: "#FCE8EC",
          100: "#F7C5CE",
          200: "#F2A2B0",
          300: "#ED7F92",
          400: "#E85C74",
          500: "#D21034", // Rouge officiel
          600: "#B80E2E",
          700: "#9E0C27",
          800: "#840A21",
          900: "#6A081A",
        },

        // Blanc et nuances de gris
        neutral: {
          DEFAULT: "#FFFFFF",
          50: "#FFFFFF",
          100: "#FAFAFA",
          200: "#F5F5F5",
          300: "#E8E8E8",
          400: "#D1D1D1",
          500: "#BABABA",
          600: "#8C8C8C",
          700: "#5E5E5E",
          800: "#3A3A3A",
          900: "#1A1A1A",
        },

        // Couleurs sémantiques
        success: {
          light: "#4ADE80",
          DEFAULT: "#22C55E",
          dark: "#16A34A",
        },
        warning: {
          light: "#FCD34D",
          DEFAULT: "#F59E0B",
          dark: "#D97706",
        },
        error: {
          light: "#FCA5A5",
          DEFAULT: "#EF4444",
          dark: "#DC2626",
        },
        info: {
          light: "#93C5FD",
          DEFAULT: "#3B82F6",
          dark: "#2563EB",
        },

        // Couleurs d'arrière-plan
        background: {
          DEFAULT: "#FFFFFF",
          secondary: "#F8FAF9", // Très léger vert
          tertiary: "#F0F4F2",
        },
      },

      fontFamily: {
        // Noms exacts comme définis dans useFonts
        lufga: ["Lufga", "system-ui", "sans-serif"],
        "lufga-medium": ["Lufga-Medium", "system-ui", "sans-serif"],
        "lufga-semibold": ["Lufga-SemiBold", "system-ui", "sans-serif"],
        "lufga-bold": ["Lufga-Bold", "system-ui", "sans-serif"],
      },
      // Système de tailles de texte
      fontSize: {
        // Headings
        "heading-xl": [
          "32px",
          { lineHeight: "120%", letterSpacing: "-0.02em" },
        ],
        "heading-lg": [
          "28px",
          { lineHeight: "120%", letterSpacing: "-0.02em" },
        ],
        heading: ["28px", { lineHeight: "120%", letterSpacing: "-0.02em" }], // Default
        "heading-md": [
          "24px",
          { lineHeight: "120%", letterSpacing: "-0.01em" },
        ],
        "heading-sm": [
          "20px",
          { lineHeight: "120%", letterSpacing: "-0.01em" },
        ],

        // Titles
        "title-xl": ["24px", { lineHeight: "130%", letterSpacing: "-0.01em" }],
        "title-lg": ["22px", { lineHeight: "130%", letterSpacing: "-0.01em" }],
        title: ["22px", { lineHeight: "130%", letterSpacing: "-0.01em" }], // Default
        "title-md": ["20px", { lineHeight: "130%" }],
        "title-sm": ["18px", { lineHeight: "130%" }],

        // Body
        "body-xl": ["18px", { lineHeight: "150%" }],
        "body-lg": ["17px", { lineHeight: "150%" }],
        body: ["16px", { lineHeight: "150%" }], // Default
        "body-md": ["15px", { lineHeight: "150%" }],
        "body-sm": ["14px", { lineHeight: "150%" }],

        // Caption/Label
        "caption-lg": ["14px", { lineHeight: "140%" }],
        caption: ["13px", { lineHeight: "140%" }],
        "caption-sm": ["12px", { lineHeight: "140%" }],
        "caption-xs": ["11px", { lineHeight: "140%" }],
      },

      // Système d'espacement basé sur 8px
      spacing: {
        0: "0px",
        px: "1px",
        0.5: "2px",
        1: "4px",
        2: "8px", // Base
        3: "12px",
        4: "16px", // 2x base
        5: "20px",
        6: "24px", // 3x base
        7: "28px",
        8: "32px", // 4x base
        9: "36px",
        10: "40px", // 5x base
        11: "44px",
        12: "48px", // 6x base
        14: "56px", // 7x base
        16: "64px", // 8x base
        18: "72px", // 9x base
        20: "80px", // 10x base
        24: "96px", // 12x base
        28: "112px", // 14x base
        32: "128px", // 16x base
        36: "144px", // 18x base
        40: "160px", // 20x base
        44: "176px",
        48: "192px",
        52: "208px",
        56: "224px",
        60: "240px",
        64: "256px",
        72: "288px",
        80: "320px",
        96: "384px",
      },

      // Border radius
      borderRadius: {
        none: "0px",
        xs: "4px",
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
        full: "9999px",

        // Pour des composants spécifiques
        button: "12px",
        card: "16px",
        input: "8px",
        badge: "6px",
        avatar: "9999px",
      },

      // Ombres personnalisées
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0, 98, 51, 0.05)",
        sm: "0 2px 4px 0 rgba(0, 98, 51, 0.06)",
        md: "0 4px 6px -1px rgba(0, 98, 51, 0.07)",
        lg: "0 10px 15px -3px rgba(0, 98, 51, 0.08)",
        xl: "0 20px 25px -5px rgba(0, 98, 51, 0.1)",
        "2xl": "0 25px 50px -12px rgba(0, 98, 51, 0.15)",
        inner: "inset 0 2px 4px 0 rgba(0, 98, 51, 0.06)",
        none: "none",

        // Ombres pour cartes et éléments flottants
        card: "0 2px 8px rgba(0, 98, 51, 0.08)",
        "card-hover": "0 4px 12px rgba(0, 98, 51, 0.12)",
        "bottom-sheet": "0 -4px 16px rgba(0, 0, 0, 0.08)",
        nav: "0 2px 8px rgba(0, 0, 0, 0.05)",
      },

      // Animations
      animation: {
        "fade-in": "fadeIn 0.3s ease-in-out",
        "fade-out": "fadeOut 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        scale: "scale 0.2s ease-in-out",
        "pulse-soft": "pulseSoft 2s infinite",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideUp: {
          "0%": { transform: "translateY(100%)" },
          "100%": { transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(0)" },
        },
        scale: {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.8" },
        },
      },
    },
  },
  plugins: [],
};
