/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      lineHeight:{
        "12":"3rem",
      },
      flexBasis:{
        "48":"48%"
      },
      gridTemplateColumns:{
        "custom":"repeat(auto-fill, minmax(48%, 1fr))",
      }
    },
    colors:{
      "secondary-blue":"#263047",
      "primary-blue" : "#0062FF",
      "white":"#ffffff",
      "primary-gray" : "#F2F2F2",
      "secondary-gray" : "#6D7D8B",
      "navbar-white" : "#F4F6F9",
      "dark-gunmetal" : "#101010",
      "purple-light" : "#BDB5F5",
      "darker-gunmetal" : "#121212",
      "light-gunmetal" : "#1a1a1a",
      "lighter-gunmetal" : "#1E1E1E",
      "lightest-gunmetal" : "#2A2A2A",
    }
    
  },
  // plugins: [require("daisyui")],
};
