module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        "plugin:vue/essential",
        "eslint:recommended"
    ],
    rules: {
        quotes: ["error", "double", {
            allowTemplateLiterals: true,
            avoidEscape: true
        }],
        semi: ["error", "always"],
        "no-alert": ["error"],
        "no-else-return": ["error"],
        "no-console": "off",
        "eol-last": ["error", "always"],
        "comma-spacing": ["error", {
            before: false,
            after: true
        }],
        "block-spacing": "error",
        "space-before-blocks": ["error", "always"],
        "keyword-spacing": ["error", {
            before: true,
            after: true
        }],
        "space-infix-ops": "error",
        "space-unary-ops": "error"
    },
    parserOptions: {
        ecmaVersion: 2021,
        parser: "babel-eslint"
    }
};
