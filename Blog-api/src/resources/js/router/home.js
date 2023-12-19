const home = [
    {
        path: "/",
        component: () => import("../layout/home.vue"),
        children: [
            {
                path: "",
                name: "home page",
                component: () => import("../pages/home/index.vue"),
            },
            {
                path: "/about",
                name: "about page",
                component: () => import("../pages/about/index.vue"),
            },
            {
                path: "/contact",
                name: "contact page",
                component: () => import("../pages/contact/index.vue"),
            },
            {
                path: "/articles",
                name: "article page",
                component: () => import("../pages/article/index.vue"),
            },
            {
                path: "/articles/:slug",
                name: "article detail page",
                component: () => import("../pages/article/show.vue"),
            },
        ],
    },
];

export default home;
