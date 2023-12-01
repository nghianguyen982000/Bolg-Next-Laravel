const home = [
    {
        path: "/",
        component: () => import("../layout/home.vue"),
        children: [
            {
                path: "",
                component:()=>import('../pages/home/index.vue')
            },
        ],
    },
];

export default home
