/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#fff",
        black: "#000",
        dark: "#1c1a1a",
        platinum: "#e0e0e0",
        torqoise: "#e5e7eb",
        charcoal: "#333D51",
        "light-red": "rgb(163, 0, 11)",
        "violet-blue": "#D3AC2B",
      },
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(90deg, rgba(52,58,64,1) 0%, rgba(130,140,150,1) 45%, rgba(233,236,239,1) 100%);",
      },
    },
    fontFamily: {
      IBM: ["IBM Plex Sans", "sans-serif"],
    },
    boxShadow: {
      xl: "10px 8px 9px -7px rgba(0,0,0,0.75)",
      xxl: "0px 12px 16px -4px rgba(16, 24, 40, 0.08), 0px 4px 6px -2px rgba(16, 24, 40, 0.03)",
      "2xl": "0px -6px 79px 0px rgba(0,0,0,0.75)",
      lg: "3px 2px 5px 0px rgba(0,0,0,0.75)",
    },
  },
  plugins: [],
};
