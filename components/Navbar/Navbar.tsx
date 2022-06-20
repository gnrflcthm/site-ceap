import { FC, useEffect, useRef, useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { Flex, Box, IconButton } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";

import NavLink from "./NavLink";

import siteRoutes from "./routes";

interface NavbarProps {
    offSet?: string | number;
}

const Navbar: FC<NavbarProps> = ({ offSet = 0 }) => {
    const [showNav, setShowNav] = useState<boolean>(false);
    const [mobile, setMobile] = useState<boolean>(true);
    const [scrollValue, setScrollValue] = useState<number>(0);
    const [scrolled, setScrolled] = useState<boolean>(false);
    const [initialTop, setInitialTop] = useState<number>(-1);

    const navbar = useRef<HTMLDivElement>(null);

    const router = useRouter();

    // Mobile Reference 768p

    useEffect(() => {
        const handleScroll = () => {
            setScrollValue(window.scrollY);
        };

        const handleChangeRoute = () => {
            setInitialTop(-1);
        };

        window.addEventListener("scroll", handleScroll);
        router.events.on("routeChangeStart", handleChangeRoute);

        return () => {
            window.removeEventListener("scroll", handleScroll);
            router.events.off("routeChangeStart", handleChangeRoute);
        };
    }, []);

    useEffect(() => {
        if (navbar.current) {
            let { offsetTop } = navbar.current;
            if (initialTop === -1) {
                setInitialTop(offsetTop);
            }
            setScrolled(scrollValue > 0);
        }
    }, [scrollValue]);

    return (
        <Flex
            justifyContent={{ base: "flex-start", lg: "center" }}
            alignItems={"center"}
            bg={"primary"}
            position={"fixed"}
            top={{
                base: "0",
                md: scrolled ? Math.max(0, initialTop - scrollValue) : offSet,
            }}
            w={"full"}
            zIndex={"sticky"}
            ref={navbar}
        >
            <IconButton
                aria-label="Expand Nav"
                icon={<FaBars />}
                display={{ base: "inherit", lg: "none" }}
                bg={"transparent"}
                color={"textOnPrimary"}
            />
            <Box display={{ base: "none", lg: "flex" }}>
                {siteRoutes.map((route, i) => (
                    <NavLink {...route} key={i} />
                ))}
            </Box>
        </Flex>
    );
};

export default Navbar;
