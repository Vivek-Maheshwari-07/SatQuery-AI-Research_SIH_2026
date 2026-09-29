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
        ink: {
          DEFAULT: '#0F172A',
        },
        text: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#64748B',
        },
        success: {
          DEFAULT: '#16A34A',
          soft: '#DCFCE7',
          strong: '#15803D',
        },
        warning: {
          DEFAULT: '#D97706',
          soft: '#FEF3C7',
          strong: '#B45309',
        },
        danger: {
          DEFAULT: '#DC2626',
          soft: '#FEE2E2',
          strong: '#B91C1C',
        },
        overlay: {
          detection: '#155EEF',
          segmentation: '#155EEF',
          change: '#DC2626',
        },
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono Variable"', '"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'brutal-sm': '2px 2px 0 0 #0B3AA4',
        'brutal': '4px 4px 0 0 #0B3AA4',
        'brutal-lg': '5px 5px 0 0 #0B3AA4',
        'raised': '6px 6px 12px rgba(15, 23, 42, 0.08), -6px -6px 12px #FFFFFF',
        'inset': 'inset 2px 2px 4px rgba(15, 23, 42, 0.08), inset -2px -2px 4px #FFFFFF',
        'elevated': '0 1px 3px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
