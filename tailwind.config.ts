/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        robotolight: ["robotolight", "sans-serif"],
        robotoregular: ["robotoregular", "sans-serif"],
        robotomedium: ["robotomedium", "sans-serif"],
        robotobold: ["robotobold", "sans-serif"],
        robotoblack: ["robotoblack", "sans-serif"],
      },
      colors: {
        "purple-dark": "#2D3561",
        primary: "#2563EB",
        secondary: "#10B981",
        boxdark: "#24303F",
        "boxdark-2": "#1A222C",
        strokedark: "#2E3A47",
        bodydark: "#AEB7C0",
      },
      gridTemplateRows: {
        '[auto,auto,1fr]': 'auto auto 1fr',
      },
    },
    aspectRatio: {
      auto: 'auto',
      square: '1 / 1',
      video: '16 / 9',
      1: '1',
      2: '2',
      3: '3',
      4: '4',
      5: '5',
      6: '6',
      7: '7',
      8: '8',
      9: '9',
      10: '10',
      11: '11',
      12: '12',
      13: '13',
      14: '14',
      15: '15',
      16: '16',
    },
  },
  variants: {
    aspectRatio: ['responsive', 'hover']
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
};
