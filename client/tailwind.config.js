/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        "ff-poppins":["Poppins","sans-serif"]
      },
      colors:{
        "accent-color":"#008C6B",
        "neutral-dark":"#1C1C1C",
        "neutral-gray":"#8C8C8C",
        "neutral-white":"#F2F2F2",
        "background-main":"#F5F5F5",
        "success-green":"#289643"
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ['light','dark','cyan','luxury','emerald']
    
  },
}

