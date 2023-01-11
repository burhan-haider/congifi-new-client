module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  important: '#root',
  theme: {
    
    extend: {
      colors: {
        'light-grey': '#83a3bb',
        'app-primary': '#052a4f',
      },
      fontFamily: {
        gSans: ['GoogleSans-Regular', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
