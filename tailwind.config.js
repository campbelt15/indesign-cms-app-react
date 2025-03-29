export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",
        primaryDark: "#1e40af",
        error: "#dc2626",
        bgLight: "#f3f4f6",
        card: "#ffffff",
        darkBg: "#1f2937", // 🆕 color fondo dark
        darkCard: "#374151", // 🆕 color tarjetas dark
      },
    },
  },
  plugins: [],
};
