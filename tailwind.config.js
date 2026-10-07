/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        groww: {
          DEFAULT: "#00B386",
          dark: "#008F6B",
          faint: "#E8F8F4",
        },
        ink: "#191C1F",
        muted: "#6B7280",
        line: "#E5E7EB",
        canvas: "#F7F8F8",
        danger: "#E11D48",
        amber: {
          DEFAULT: "#D97706",
          faint: "#FEF3C7",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,0.04), 0 8px 24px rgba(16,24,40,0.04)",
        float: "0 12px 40px rgba(16,24,40,0.08)",
      },
      minHeight: {
        tap: "44px",
      },
    },
  },
  plugins: [],
}
