module.exports = {
    extends: ["expo", "prettier"],
    plugins: ["prettier"],
    rules: {
        "prettier/prettier": "error",
        "eol-last": ["warn", "always"],
        "linebreak-style": ["warn", "unix"],
    },
};
