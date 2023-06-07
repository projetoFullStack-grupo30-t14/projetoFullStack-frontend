/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme")
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      brand: {
        1: "#4529E6",
        2: "#5126EA",
        3: "#B0A6F0",
        4: "#EDEAFD"
      },
      grey: {
        0: "#0B0D0D",
        1: "#212529",
        2: "#495057",
        3: "#868E96",
        4: "#ADB5BD",
        5: "#CED4DA",
        6: "#DEE2E6",
        7: "#E9ECEF",
        8: "#F1F3F5",
        9: "#F8F9FA",
        10: "#FDFDFD",
        whiteFixed: "#FFFFFF",
      },
      alert: {
        1: "#CD2B31",
        2: "#FDD8D8",
        3: "#FFE5E5",
      },
      success: {
        1: "#18794E",
        2: "#CCEBD7",
        3: "#DDF3E4",
      },
      random: {
        1: "#E34D8C",
        2: "#C04277",
        3: "#7D2A4D",
        4: "#7000FF",
        5: "#6200E3",
        6: "#36007D",
        7: "#349974",
        8: "#2A7D5F",
        9: "#153D2E",
        10: "#6100FF",
        11: "#5700E3",
        12: "#30007D",
      },
    },
    fontSize: {
      heading1: ["44px", "56px"],
      heading2: ["36px", "45px"],
      heading3: ["32px", "40px"],
      heading4: ["28px", "35px"],
      heading5: ["24px", "30px"],
      heading6: ["20px", "25px"],
      heading7: ["16px", "20px"],
      body1: ["16px", "28px"],
      body2: ["14px", "24px"],
      btnBig: ["16px", "0px"],
      btnMedium: ["14px", "0px"],
      inputPlace: ["16px", "0px"],
      inputLabel: ["14px", "17px"],
    },
    fontFamily: {
      "lexend": ["lexend", "sans-serif"],
      "inter": ["inter", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
}
