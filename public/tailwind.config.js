/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{html,js}"],
  theme: {
    extend : {
      colors:{
        blue:{
          primary:'#3F81E0',
          secondary: '#1746A2',
          button:'rgba(63, 129, 224, 0.5)'
        },
        grey:{
          light :'#f7fbff',
        },
        orange:{
          light:'#ff731d',
          dark: '#df5e07'
        }

      }
    },
  },
  plugins: [],
}

