module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        brand: {
          light: '#1e2022',
          DEFAULT: '#181a1b',
          dark: '#0c87b8',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
