import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        jambu: {
          green: "#4CAF50",
          red: "#FF3D3D",
        },
      },
      borderRadius: {
        '2xl': '1.25rem',
      }
    },
  },
  plugins: [],
};
export default config;


