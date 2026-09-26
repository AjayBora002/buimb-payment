/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        finora: {
          blue: '#2B59FF',
          'blue-dark': '#1E40AF',
          'blue-light': '#EFF4FF',
          navy: '#0A1128',
          slate: '#64748B',
          sky: '#649EB5',
        },
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
        brand: {
          navy: '#0A1128',
          blue: '#2B59FF',
          accent: '#2B59FF',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', '"Inter"', '"Public Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
