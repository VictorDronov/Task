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
      screens: {
        tablet: "700px",
        // => @media (min-width: 700px) { ... }

        laptop: "1024px",
        // => @media (min-width: 1024px) { ... }

        desktop: "1280px",
        // => @media (min-width: 1280px) { ... }
      },
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
