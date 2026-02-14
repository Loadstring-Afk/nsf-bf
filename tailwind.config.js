/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          pink: '#ff69b4',
          purple: '#9d4edd',
          dark: '#0a0a0f',
          glass: 'rgba(255, 105, 180, 0.1)',
        }
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'typewriter': 'typewriter 4s steps(40) 1s 1 normal both',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(255, 105, 180, 0.3)',
            borderColor: '#ff69b4'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(255, 105, 180, 0.6)',
            borderColor: '#ff1493'
          },
        },
      },
    },
  },
  plugins: [],
}