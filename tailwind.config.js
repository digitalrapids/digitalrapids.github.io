/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./_components/**/*.webc', './_includes/**/*.webc'],
  theme: {
    extend: {
      backgroundImage: {
        waves:
          "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/assets/wellen_hintergrund.svg')",
      },
      colors: {
        drbeige: '#f6f5f4', // f6f5f4
        drdarkgray: '#333333',
        drgold: '#ceb37e',
        drlightgray: '#c6c6c6',
        drpink: '#fa2969',
      },
      flexGrow: {
        2: '2',
      },
      fontFamily: {
        sans: ['Noto Sans'],
      },
      fontSize: {
        base: '0.875rem',
      },
    },
  },
  plugins: [],
}
