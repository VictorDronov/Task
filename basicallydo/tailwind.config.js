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
          primary: "#0363F9",
          secondary: "#4DD962",
          text: "#F8FFF3",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
