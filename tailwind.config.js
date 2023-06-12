/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {},
  },
  plugins: [],
}

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ]
}

module.exports = {
  theme: {
    extend: {
      backgroundImage: {
        'pattern': 'repeating-linear-gradient(45deg, #000000 25%, transparent 25%, transparent 75%, #000000 75%, #000000), repeating-linear-gradient(45deg, #000000 25%, #ffffff 25%, #ffffff 75%, #000000 75%, #000000)',
      },
      backgroundPosition: {
        'pattern': '0 0, 6px 6px',
      },
      backgroundSize: {
        'pattern': '12px 12px',
      },
    },
  },
  variants: {},
  plugins: [],
};


