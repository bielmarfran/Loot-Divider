module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: {
          lightest: '#25282a',
          light: '#1e2022',
          border: '#363b3d',
          DEFAULT: '#181a1b',
          dark: '#0c87b8',
          text: '#bdb7af',
          red: '#860707',
          red2: '#ae1c1c',
          green: '#047854',
          green2: '#036046',
          modal: '#333739',
          notActive: '#2f3335',
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
