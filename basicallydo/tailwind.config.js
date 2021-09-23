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
      backgroundImage: (theme) => ({
        "hero-pattern": "url('/images/signupBackground.jpg')",
      }),
      colors: {
        brand: {
          primary: "#467CF0",
          secondary: "#020202",
          lightSecondary: "#373737",
          text: "#FFFFFF",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
