/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--neon-cyan)',
        surface: 'var(--soft-white)',
        text: '#1f2937',
        textMuted: '#6b7280',
        border: '#e5e7eb',
      },
      boxShadow: {
        soft: '0 2px 4px rgba(0, 0, 0, 0.1)',
        medium: '0 4px 6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
}

