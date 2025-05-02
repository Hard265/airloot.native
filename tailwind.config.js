/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./App.{js,jsx,ts,tsx}",
        "./Router.{js,jsx,ts,tsx}",
        "./pages/**/*.{js,jsx,ts,tsx}",
        "./components/**/*.{js,jsx,ts,tsx}",
        "./partials/**/*.{js,jsx,ts,tsx}",
        "./widgets/**/*.{js,jsx,ts,tsx}",
    ],
    presets: [require("nativewind/preset")],
    theme: {
        extend: {
            colors: {
                primary: "rgb(var(--color-primary) / <alpha-value>)",
                secondary: "rgb(var(--color-secondary) / <alpha-value>)",
                background: "rgb(var(--color-background) / <alpha-value>)",
                text: "rgb(var(--color-text) / <alpha-value>)",
                error: "rgb(var(--color-error) / <alpha-value>)",
                border: "rgb(var(--color-border) / <alpha-value>)",
            },
            fontFamily: {
                medium: ["Montreal-Medium"],
                bold: ["Montreal-Bold"],
                regular: ["Montreal-Regular"],
                light: ["Montreal-Light"],
            },
        },
    },
    plugins: [
        ({ addBase }) =>
            addBase({
                ":root": {
                    "--color-primary": "97 95 255",
                    "--color-secondary": "255 255 255",
                    "--color-background": "255 255 255",
                    "--color-text": "0 0 0",
                    "--color-error": "251 44 54",
                    "--color-border": "209 213 220",
                },
                "@media (prefers-color-scheme: dark)": {
                    ":root": {
                        "--color-primary": "124 134 255",
                        "--color-secondary": "39 39 42",
                        "--color-background": "0 0 0",
                        "--color-error": "255 100 103",
                        "--color-text": "255 255 255",
                        "--color-border": "59 59 62",
                    },
                },
            }),
    ],
};
