/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  daisyui: {
    themes: [
      {
        turner: {
          primary: '#3A00E5',
          secondary: '#00f400',
          accent: '#0097ff',
          neutral: '#F2F4F8',
          'base-100': '#FFF',
          info: '#00cdff',
          success: '#009951',
          warning: '#CE9700',
          error: '#DC3412'
        }
      }
    ]
  },
  plugins: [require('daisyui')]
}
