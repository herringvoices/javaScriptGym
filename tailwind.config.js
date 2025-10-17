import forms from "@tailwindcss/forms";
import typography from "@tailwindcss/typography";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f8ff",
          100: "#e8efff",
          200: "#ccdfff",
          300: "#9ec2ff",
          400: "#6da4ff",
          500: "#3b82f6",
          600: "#1d6ee6",
          700: "#1557c4",
          800: "#13479d",
          900: "#123d7e",
        },
      },
      boxShadow: {
        card: "0 10px 25px -10px rgba(15, 23, 42, 0.3)",
      },
    },
  },
  plugins: [forms, typography],
};
