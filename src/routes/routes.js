export const routes = [
    {
        component: () => import("@/components/Vcard"),
        meta: {
            title: "vcard"
        },
        name: "vcard",
        path: "*"
    }
];
