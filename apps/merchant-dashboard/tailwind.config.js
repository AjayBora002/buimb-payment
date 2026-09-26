/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'ledger-ink': '#131B17',
        paper: '#EDE7D6',
        'paper-bright': '#F6F3EA',
        'deep-teal': '#1D2E28',
        brass: '#C9A227',
        moss: '#4E8B6F',
        'stamp-red': '#B0503F',
        'amber-warn': '#C98A2E',
        'text-on-ink': '#EDE7D6',
        'text-on-paper': '#131B17',
        'text-muted-ink': '#8FA396',
        'text-muted-paper': '#5C5646',
        // Semantic aliases pointing strictly to the Ledger design tokens
        bg: {
          primary: '#131B17',
          secondary: '#1D2E28',
          elevated: '#1D2E28',
          hover: '#243831',
        },
        surface: {
          elevated: '#1D2E28',
          hover: '#243831',
          subtle: '#131B17',
        },
        primary: {
          DEFAULT: '#C9A227',
          bright: '#DBB53B',
          dark: '#B08C1E',
        },
        tx: {
          primary: '#EDE7D6',
          secondary: '#8FA396',
          muted: '#8FA396',
        },
        status: {
          success: '#4E8B6F',
          warning: '#C98A2E',
          error: '#B0503F',
          info: '#C9A227',
        },
        border: {
          subtle: 'rgba(237, 231, 214, 0.08)',
          strong: 'rgba(237, 231, 214, 0.16)',
          paper: 'rgba(19, 27, 23, 0.12)',
        },
      },
      borderRadius: {
        card: '0px',
        btn: '4px',
        DEFAULT: '4px',
        md: '4px',
        lg: '4px',
        xl: '4px',
        '2xl': '4px',
      },
      fontFamily: {
        sans: ['"Public Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};

