import { useState, useEffect, FC } from "react";

import NextLink from "next/link";
import { useRouter } from "next/router";

import { Box, Flex, Link } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { BsCaretDownFill, BsFillCaretDownFill } from "react-icons/bs";

import { SiteRoute } from "./routes";

interface NavLinkProps {
    name: string;
    route: string;
    subroutes?: SiteRoute[];
    color?: string;
    isSubroute?: boolean;
}

const NavLink: FC<NavLinkProps> = ({
    name,
    route,
    subroutes,
    color,
    isSubroute = false,
}) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [hovered, setHovered] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        setIsActive(
            router.pathname.substring(1).split("/")[0] === route.substring(1)
        );
    }, [router.pathname]);

    return (
        <Box
            position={"relative"}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            bg={isActive ? "textOnPrimary" : "transparent"}
            color={isActive ? "primary" : "textOnPrimary"}
            _hover={{
                bg: isSubroute ? "primary" : "textOnPrimary",
                color: "primary",
            }}
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
                        color: isSubroute ? "textOnPrimary" : "inherit",
                    }}
                    color={color || "inherit"}
                    justifyContent={"space-around"}
                    alignItems={"center"}
                >
                    {name}{" "}
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
                        bg={"textOnPrimary"}
                        top={"100%"}
                        left={"50%"}
                        transform={"auto"}
                        translateX={"-50%"}
                        minW={"100%"}
                        whiteSpace={"nowrap"}
                        textAlign={"center"}
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
                                    {...subroute}
                                    color={"black"}
                                    isSubroute={true}
                                />
                            </Box>
                        ))}
                    </Flex>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default NavLink;
