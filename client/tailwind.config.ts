import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-500': '#2E7D32',
        primary: '#4CAF50',
        'primary-300': '#81C784',
        'secondary-500': '#1976D2',
        secondary: '#2196F3',
        'secondary-300': '#64B5F6',
        'neutral-700': '#222222',
        'neutral-500': '#ECEFF1',
      },
    },
  },
  plugins: [],
}
export default config
