export interface SiteRoute {
    name: string;
    route: string;
    subroutes?: SiteRoute[];
    activeRoutes?: string[];
}

const siteRoutes: SiteRoute[] = [
    {
        name: "Home",
        route: "/home",
        activeRoutes: ["/", "/home"],
    },
    {
        name: "Who We Are",
        route: "/about",
        subroutes: [
            {
                name: "About CEAP",
                route: "/about/ceap",
            },
            {
                name: "History",
                route: "/about/history",
            },
            {
                name: "Vision, Mission, & Core Values",
                route: "/about/test",
            },
            {
                name: "Strategic Direction",
                route: "/about/strategic-direction",
            },
            {
                name: "Meet The Members",
                route: "/about/members",
            },
        ],
    },
    {
        name: "News & Events",
        route: "/news-and-events",
        subroutes: [
            {
                name: "News",
                route: "/news-and-events/news",
            },
            {
                name: "Photo Gallery",
                route: "/news-and-events/gallery/photos",
            },
            {
                name: "Video Gallery",
                route: "/news-and-events/gallery/videos",
            },
        ],
    },
    {
        name: "Member Schools",
        route: "/member-schools",
    },
    {
        name: "Resources",
        route: "/resoureces",
    },
    {
        name: "Contact Us",
        route: "/contact",
    },
];

export default siteRoutes;
