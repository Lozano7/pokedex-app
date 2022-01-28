module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        normal: '#ddd',
        fire: '#F04',
        water: '#0597F4',
        grass: '#00B346',
        electric: '#FFE74C',
        ice: '#02DBFE',
        fighting: '#E00001',
        poison: '#EE00D0',
        ground: '#FFC100',
        flying: '#00B1F4',
        psychic: '#FF389D',
        bug: '#6CD143',
        rock: '#D18F00',
        ghost: '#7F7F7F',
        dragon: '#7E2EA1',
        dark: '#444',
        steel: '#B5B5B5',
        fairy: '#FFC0CB',
      },
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [],
};
