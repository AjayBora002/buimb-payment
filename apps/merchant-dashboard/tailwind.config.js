/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Razorpay Core Brand Palette
        razorpay: {
          blue: '#0D6EFD',
          hover: '#0B5ED7',
          dark: '#0C2340',
          navy: '#0C1938',
          sidebar: '#0C1938',
          subtle: '#F0F6FF',
          accent: '#3395FF',
        },
        slate: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
        },
        // Backward compatibility mappings
        'ledger-ink': '#0F172A',
        paper: '#FFFFFF',
        'paper-bright': '#F8FAFC',
        'deep-teal': '#0C1938',
        brass: '#0D6EFD',
        moss: '#10B981',
        'stamp-red': '#EF4444',
        'amber-warn': '#F59E0B',
        'text-on-ink': '#0F172A',
        'text-on-paper': '#0F172A',
        'text-muted-ink': '#64748B',
        'text-muted-paper': '#64748B',
        bg: {
          primary: '#F8FAFC',
          secondary: '#FFFFFF',
          elevated: '#FFFFFF',
          hover: '#F1F5F9',
        },
        surface: {
          elevated: '#FFFFFF',
          hover: '#F1F5F9',
          subtle: '#F8FAFC',
        },
        primary: {
          DEFAULT: '#0D6EFD',
          bright: '#3395FF',
          dark: '#0B5ED7',
        },
        tx: {
          primary: '#0F172A',
          secondary: '#475569',
          muted: '#94A3B8',
        },
        status: {
          success: '#10B981',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#0D6EFD',
        },
        border: {
          subtle: '#E2E8F0',
          strong: '#CBD5E1',
          paper: '#E2E8F0',
        },
      },
      borderRadius: {
        card: '8px',
        btn: '6px',
        DEFAULT: '6px',
        md: '8px',
        lg: '10px',
        xl: '12px',
        '2xl': '16px',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"IBM Plex Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px 0 rgb(0 0 0 / 0.05), 0 1px 2px -1px rgb(0 0 0 / 0.05)',
        elevated: '0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.05)',
        drawer: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
    },
  },
  plugins: [],
};
