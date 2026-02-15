import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        finance: '#10b981',
        travel: '#3b82f6',
        ai: '#8b5cf6',
        work: '#f59e0b',
        thinking: '#ec4899',
        reading: '#14b8a6',
        resource: '#6366f1',
        life: '#84cc16',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config