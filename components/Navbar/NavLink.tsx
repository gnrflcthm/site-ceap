import { useState, useEffect, FC } from "react";

import NextLink from "next/link";
import { useRouter } from "next/router";

import { Box, Flex, Link } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { BsFillCaretDownFill } from "react-icons/bs";

import { SiteRoute } from "./routes";

interface NavLinkProps {
    name: string;
    route: string;
    subroutes?: SiteRoute[];
    color?: string;
    isSubroute?: boolean;
    activeRoutes?: string[];
    navScrolled?: boolean;
}

const NavLink: FC<NavLinkProps> = ({
    name,
    route,
    subroutes,
    color,
    isSubroute = false,
    activeRoutes = [],
    navScrolled,
}) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        setIsActive(
            router.pathname.substring(1).split("/")[0] === route.substring(1) ||
                activeRoutes.includes(router.pathname)
        );
    }, [router.pathname]);

    return (
        <Flex
            position={"relative"}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            color={
                isSubroute
                    ? "neutralizerDark"
                    : isActive
                    ? "primary"
                    : navScrolled
                    ? "neutralizerDark"
                    : "neutralizerLight"
            }
            fontSize={"sm"}
            fontWeight={"500"}
            h={"full"}
            justify={"flex-start"}
            align={"center"}
            bg={isSubroute ? (hovered ? "primary" : "none") : "none"}
        >
            <NextLink href={route} passHref>
                <Link
                    p={"2"}
                    px={"4"}
                    onClick={subroutes && ((e) => e.preventDefault())}
                    display={"flex"}
                    textDecor={"none"}
                    _hover={{
                        textDecor: "none",
                        color: isSubroute ? "neutralizerLight" : "primary",
                    }}
                    justifyContent={"flex-start"}
                    w={"full"}
                >
                    {name.toUpperCase()}{" "}
                    {subroutes && <Box as={BsFillCaretDownFill} pl={"2"} />}
                </Link>
            </NextLink>
            <AnimatePresence>
                {subroutes && hovered && (
                    <Flex
                        as={motion.div}
                        flexDir={"column"}
                        position={"absolute"}
                        initial={{ height: "0%" }}
                        animate={{ height: "fit-content" }}
                        bg={"neutralizerLight"}
                        top={"100%"}
                        left={"0"}
                        transform={"auto"}
                        minW={"100%"}
                        whiteSpace={"nowrap"}
                        zIndex={"dropdown"}
                    >
                        {subroutes.map((subroute, i) => (
                            <Box
                                as={motion.div}
                                initial={{ x: -10, opacity: 0 }}
                                animate={{
                                    x: 0,
                                    opacity: 1,
                                    transition: { delay: i * 0.02 },
                                }}
                            >
                                <NavLink
                                    color={"neutralizerDark"}
                                    {...subroute}
                                    isSubroute={true}
                                />
                            </Box>
                        ))}
                    </Flex>
                )}
            </AnimatePresence>
        </Flex>
    );
};

export default NavLink;
