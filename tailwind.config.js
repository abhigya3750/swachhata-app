/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        municipal: {
          blue: '#1A73E3',
          darkBlue: '#1557B0',
          lightBlue: '#E8F0FE',
        },
        eco: {
          green: '#0F9D58',
          darkGreen: '#0B8043',
          lightGreen: '#E6F4EA',
        },
        civic: {
          yellow: '#F59E0B',
          lightYellow: '#FEF3C7',
          darkYellow: '#D97706',
        },
        action: {
          red: '#DC3545',
          lightRed: '#FCE8E6',
        },
        base: {
          white: '#FFFFFF',
          offWhite: '#F8F9FA',
          slate: '#F1F5F9',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      minHeight: {
        'touch': '48px',
      },
      minWidth: {
        'touch': '48px',
      }
    },
  },
  plugins: [],
}
