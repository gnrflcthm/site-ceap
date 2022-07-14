import { FC, useEffect, useRef, useState } from "react";

import NextLink from "next/link";

import { useRouter } from "next/router";
import Image from "next/image";

import { Flex, Box, Heading, IconButton } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

import logo from "../../public/logo.png";
import siteRoutes from "./routes";

import NavLink from "./NavLink";

const Navbar: FC<{ isHome?: boolean }> = ({ isHome }) => {
    const [navBg, setNavBg] = useState("transparent");

    const navbar = useRef<HTMLDivElement>(null);

    const router = useRouter();

    // Mobile Reference 768p

    useEffect(() => {
        const handleScroll = () => {
            if (navbar.current) {
                let { offsetHeight, offsetTop } = navbar.current;
                if (["/home", "/"].includes(window.location.pathname)) {
                    setNavBg(
                        (offsetTop || 0) > (offsetHeight || 0)
                            ? "neutralizerLight"
                            : "transparent"
                    );
                }
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        if (["/home", "/"].includes(window.location.pathname)) {
            setNavBg("transparent");
        } else {
            setNavBg("neutralizerLight");
        }
    }, [router]);

    return (
        <Flex
            justifyContent={"space-between"}
            alignItems={"stretch"}
            position={"sticky"}
            top={"0"}
            zIndex={"sticky"}
            ref={navbar}
            bg={navBg}
            transition={"all 0.2s ease"}
            px={"10"}
        >
            <NextLink href="/home" passHref>
                <Flex
                    as={"a"}
                    justifyContent={"space-between"}
                    position={"relative"}
                    alignItems={"stretch"}
                    my={"4"}
                    cursor={"pointer"}
                >
                    <Box position={"relative"} objectFit={"contain"} px={"8"}>
                        <Image
                            src={logo}
                            layout={"fill"}
                            objectFit={"contain"}
                        />
                    </Box>
                    <Heading color={"primary"}>CEAP</Heading>
                </Flex>
            </NextLink>
            <Flex alignItems={"stretch"} justifyContent={"space-between"}>
                {siteRoutes.map((route, i) => (
                    <NavLink
                        {...route}
                        key={i}
                        navScrolled={navBg === "neutralizerLight"}
                    />
                ))}
                <IconButton
                    icon={<FaSearch />}
                    aria-label={"search"}
                    bg={"transparent"}
                    color={
                        navBg === "neutralizerLight"
                            ? "neutralizerDark"
                            : "neutralizerLight"
                    }
                    _hover={{
                        color: "primary",
                    }}
                    alignSelf={"center"}
                />
            </Flex>
        </Flex>
    );
};

export default Navbar;
