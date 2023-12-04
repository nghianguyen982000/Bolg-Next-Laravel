const home = [
    {
        path: "/",
        component: () => import("../layout/home.vue"),
        children: [
            {
                path: "",
                component:()=>import('../pages/home/index.vue')
            },
            {
                path: "/about",
                component:()=>import('../pages/about/index.vue')
            },
            {
                path: "/contact",
                component:()=>import('../pages/contact/index.vue')
            },
            {
                path: "/articles",
                component:()=>import('../pages/article/index.vue')
            },
        ],
    },
];

export default home
