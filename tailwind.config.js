/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundColor: {
        'custom-background': '#3A98B9',
        'custom-primary': '#FFF1DC',
        'custom-secondary': '#E8D5C4',
        'custom-white': '#EEEEEE',
      },
      maxWidth: {
        550: '550px',
      },
    },
  },
  plugins: [],
}
