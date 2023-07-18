/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'teal': {
          "50": "#ebfdfc",
          "100": "#d6fafa",
          "200": "#aef5f4",
          "300": "#85f1ef",
          "400": "#5dece9",
          "500": "#34e7e4",
          "600": "#2ab9b6",
          "700": "#1f8b89",
          "800": "#155c5b",
          "900": "#0a2e2e"
        }
      },
      animation: {
        'spin-reverse': 'spin 1s linear infinite reverse'
      }
    },
  },
  plugins: [],
  safeList: [
    'dynamic-select',
    ...['control', 'value-container', 'indicators', 'menu', 'menu-list', 'option'].map(postfix => `dynamic-select__${postfix}`)
  ],
}
