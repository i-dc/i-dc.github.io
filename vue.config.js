module.exports = {
    transpileDependencies: [
        "vuetify"
    ],
    publicPath: process.env.NODE_ENV === "production" ? process.env.VUE_APP_PATH : "/",
    productionSourceMap: process.env.NODE_ENV !== "production",
    devServer: {
        disableHostCheck: true
    },
    chainWebpack: config => {
        config.plugin("html").tap(args => {
            args[0].author = process.env.VUE_APP_AUTHOR;
            args[0].description = process.env.VUE_APP_DESCRIPTION;
            args[0].domain = process.env.VUE_APP_DOMAIN;
            args[0].app_path = process.env.VUE_APP_PATH;
            args[0].image_src = process.env.VUE_APP_PATH + process.env.VUE_APP_IMAGE_SRC;
            args[0].image_width = process.env.VUE_APP_IMAGE_WIDTH;
            args[0].image_height = process.env.VUE_APP_IMAGE_HEIGHT;
            args[0].language = process.env.VUE_APP_LANG;
            args[0].locale = process.env.VUE_APP_LOCALE;
            args[0].title = process.env.VUE_APP_SPA_NAME;
            args[0].first_name = process.env.VUE_APP_FIRST_NAME;
            args[0].last_name = process.env.VUE_APP_LAST_NAME;
            args[0].gender = process.env.VUE_APP_GENDER;

            return args;
        });
    },
    pwa: {
        name: process.env.VUE_APP_NAME,
        theme_color: "#FFFFFF",
        msTileColor: "#FFFFFF",
        appleMobileWebAppCapable: "yes",
        appleMobileWebAppStatusBarStyle: "white",
        manifestPath: "manifest.webmanifest",
        iconPaths: {
            favicon16: "icons/16x16.png",
            favicon32: "icons/32x32.png",
            appleTouchIcon: "icons/152x152.png",
            maskIcon: "icons/safari-pinned-tab.svg",
            msTileImage: "icons/144x144.png"
        },
        manifestOptions: {
            name: process.env.VUE_APP_NAME,
            scope: process.env.VUE_APP_PATH,
            start_url: process.env.VUE_APP_PATH,
            lang: process.env.VUE_APP_LANG,
            display: "standalone",
            background_color: "#FFFFFF",
            icons: [
                {
                    src: process.env.VUE_APP_PATH +  "icons/36x36.png",
                    sizes: "36x36",
                    type: "image/png",
                    density: 0.75
                },
                {
                    src: process.env.VUE_APP_PATH +  "icons/48x48.png",
                    sizes: "48x48",
                    type: "image/png",
                    density: 1
                },
                {
                    src: process.env.VUE_APP_PATH +  "icons/72x72.png",
                    sizes: "72x72",
                    type: "image/png",
                    density: 1.5
                },
                {
                    src: process.env.VUE_APP_PATH +  "icons/96x96.png",
                    sizes: "96x96",
                    type: "image/png",
                    density: 2
                },
                {
                    src: process.env.VUE_APP_PATH +  "icons/128x128.png",
                    sizes: "128x128",
                    type: "image/png",
                    density: 2
                },
                {
                    src: process.env.VUE_APP_PATH +  "icons/144x144.png",
                    sizes: "144x144",
                    type: "image/png",
                    density: 3
                },
                {
                    src: process.env.VUE_APP_PATH +  "icons/192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                    density: 4
                },
                {
                    src: process.env.VUE_APP_PATH +  "icons/192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                    purpose: "maskable",
                    density: 4
                },
                {
                    src: process.env.VUE_APP_PATH +  "icons/512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    density: 5
                },
                {
                    src: process.env.VUE_APP_PATH +  "icons/512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                    purpose: "maskable",
                    density: 5
                }
            ]
        }
    }
};
