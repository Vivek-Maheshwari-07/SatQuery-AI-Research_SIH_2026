/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#155EEF',
          dark: '#0B3AA4',
          soft: '#EAF2FF',
        },
        surface: {
          DEFAULT: '#F8FAFC',
        },
        border: {
          DEFAULT: '#D9E2F0',
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#64748B',
        },
        success: {
          DEFAULT: '#16A34A',
        },
        warning: {
          DEFAULT: '#D97706',
        },
        danger: {
          DEFAULT: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'brutalist-sm': '2px 2px 0px #0F172A',
        'brutalist': '3px 3px 0px #0F172A',
        'brutalist-hover': '1px 1px 0px #0F172A',
        'soft': '0 4px 20px -2px rgba(21, 94, 239, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'elevated': '0 10px 25px -5px rgba(15, 23, 42, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)',
      },
    },
  },
  plugins: [],
}
