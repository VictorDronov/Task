module.exports = {
  mode: "jit",
  purge: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./sections/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        "fade-out": {
          "0%": {
            opacity: "1",
          },
          "25%": {
            opacity: "0.7",
          },
          "50%": {
            opacity: "0.4",
          },
          "75%": {
            opacity: "0.7",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
      animation: {
        "fade-out": "fade-out 1s infinite ease-out",
      },
      colors: {
        brand: {
          primary: "#467CF0",
          secondary: "#020202",
          lightSecondary: "#373737",
          text: "#FFFFFF",
        },
      },
      borderWidth: {
        3: "3px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
