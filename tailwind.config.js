/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    screens: {
      xs: "480px",   // small phones
      sm: "640px",   // phones
      md: "768px",   // tablets
      lg: "1024px",  // laptops  ✅ your breakpoint
      xl: "1280px",  // desktops
      "2xl": "1536px",
    },

    container: {
      center: true,
      padding: "1rem",
    },

    extend: {
      colors: {
        primary: "#2563eb",
        secondary: "#111827",
      },
    },
  },

  plugins: [],
};