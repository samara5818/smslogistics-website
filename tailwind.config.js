/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef5ff",
          100: "#d9e8ff",
          600: "#0758c7",
          700: "#004493",
          800: "#073b78",
          950: "#071a35",
        },
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Manrope", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        header: "0 8px 30px rgba(15, 23, 42, 0.08)",
        enterprise: "0 4px 20px rgba(15, 23, 42, 0.06)",
        "enterprise-hover": "0 18px 40px rgba(15, 23, 42, 0.10)",
      },
    },
  },
  plugins: [],
};
