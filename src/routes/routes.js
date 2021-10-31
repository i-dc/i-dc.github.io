export const routes = [
    {
        component: () => import("@/components/Vcard"),
        meta: {
            title: "vcard"
        },
        name: "vcard",
        path: "*"
    },
    {
        component: () => import("@/components/Vcard"),
        meta: {
            title: "vcard"
        },
        name: "vcard",
        path: `${process.env.VUE_APP_PATH}:lang`,
    }
];
