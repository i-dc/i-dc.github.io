module.exports = {
    presets: [
        "@vue/cli-plugin-babel/preset",
        [
            "minify",
            {
                builtIns: false,
                evaluate: false,
                mangle: false
            }
        ]
    ],
    plugins: [
        "babel-plugin-minify-constant-folding",
        "minify-numeric-literals",
        "transform-minify-booleans"
    ]
};
