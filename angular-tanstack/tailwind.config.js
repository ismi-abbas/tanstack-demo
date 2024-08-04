/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "bright-blue": "oklch(51.01% 0.274 263.83)",
        "electric-violet": "oklch(53.18% 0.28 296.97)",
        "french-violet": "oklch(47.66% 0.246 305.88)",
        "vivid-pink": "oklch(69.02% 0.277 332.77)",
        "hot-red": "oklch(61.42% 0.238 15.34)",
        "orange-red": "oklch(63.32% 0.24 31.68)",
        "pill-accent": "oklch(51.01% 0.274 263.83)",
        gray: {
          900: "oklch(19.37% 0.006 300.98)",
          700: "oklch(36.98% 0.014 302.71)",
          400: "oklch(70.9% 0.015 304.04)",
        },
      },
    },
  },
  plugins: [],
};
