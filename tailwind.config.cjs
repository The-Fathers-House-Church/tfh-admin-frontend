/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColor: {
        dark: '#2F313F',
        success: '#2BB62A',
        error: "#F13637",
        warning: "#EEB614",
        secondary: '#FF6634',
        primary: '#002F72',

      },
      fontFamily: {
        primary: "Inter, sans-serif",
        secondary: "Work Sans, sans-serif"
      },
      backgroundColor: {
        primary: '#002F72',
        primaryAccent1: "#D8D0FF",
        primaryAccent2: "#EAE5FF",
        secondary: '#FF6634',
        dark: '#05001A',
        grey: '#F4F4F4',
        mediumDark: '#181818',
        lightDark: '#404040',
        error: '#F13637',
        warning: "#EEB614",
      },
      borderColor: {
        mediumDark: '#181818',
        dark: '#121212',
        lightDark: '#404040',
        lightGrey: '#D7D7D7',
      },
      padding: {
        primary: '5vw',
      },
      minHeight: {
        main: 'calc(100vh - 60px)',
      },
    },
  },
  plugins: [],
}
