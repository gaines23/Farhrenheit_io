/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'ec-purple-text': '#9726F0',
          'ec-purple': '#530881',
          'ec-orange': '#fd7020',
          'input-fill': '#F4F1F1',
          'bg-fill': '#827d7db3',
          'far-yellow': '#FFD700',
          'far-teal': '#00c2cb',
          'far-navy': '#020e1e'
        },
        height: {
          '38': '10rem',
          '98': '20rem',
          '100': '28rem',
          '102': '30rem',
          '108': '42rem',
        },
      },
    },
    plugins: [
      require('tailwind-scrollbar'),
    ],
  }
  