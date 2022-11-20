import { FC, useContext, useEffect, useMemo, useRef } from "react";

import {
    Flex,
    useBreakpoint,
    Text,
    Box,
    CircularProgress,
    Center,
} from "@chakra-ui/react";

import { AnimatePresence, motion, TargetAndTransition } from "framer-motion";

import CoreNav from "./CoreNav";
import PublicNav from "./PublicNav";
import { CollapseContext } from "pages/_app";
import { AuthContext } from "@context/AuthContext";
import { MobileContext } from "@components/Layout";
import Router from "next/router";

const SideBar: FC = () => {
    const [collapsed, setCollapsed] = useContext(CollapseContext);
    const { user, loading } = useContext(AuthContext);
    const breakpoint = useBreakpoint();
    const isMobile = useContext(MobileContext);

    useEffect(() => {
        const onRouteChange = () => {
            if (isMobile) {     // Fix: handler values don't change once set.
                setCollapsed(false);
            }
        };
        Router.events.on("routeChangeComplete", onRouteChange);
        return () => {
            Router.events.off("routeChangeComplete", onRouteChange);
        }
    }, [])

    const sidebarWidth = useMemo<string>(() => {
        if (isMobile) {
            switch (breakpoint) {
                case "sm":
                    return "55vw";
                case "md":
                    return "40vw";
                default:
                    return "70vw";
            }
        } else if (!(user && collapsed)) {
            return "20vw";
        } else {
            return collapsed ? "5vw" : "20vw";
        }
    }, [collapsed, isMobile, breakpoint, user]);

    const sidebarPosition = useMemo<string>(() => {
        if (isMobile) {
            return collapsed ? "0vw" : "-80vw"; // Fix: Inverted Values
        }
        if (user) {
            return "0vw";
        }
        return collapsed ? "-20vw" : "0vw";
    }, [collapsed, isMobile, user]);

    return (
        <>
            <AnimatePresence>
                {isMobile && collapsed && (
                    <Box
                        as={motion.div}
                        initial={{
                            opacity: 0,
                        }}
                        animate={{
                            opacity: 1,
                        }}
                        exit={{
                            opacity: 0,
                        }}
                        position={"fixed"}
                        h={"100vh"}
                        w={"100vw"}
                        top={"0"}
                        left={"0"}
                        bg={"blackAlpha.500"}
                        zIndex={"49"}
                        onClick={() => setCollapsed(false)}
                    />
                )}
            </AnimatePresence>
            <Flex
                position={isMobile ? "absolute" : "relative"}
                as={motion.div}
                flexDir={"column"}
                align={"stretch"}
                minH={"100vh"}
                h={"100vh"}
                justify={"center"}
                bg={"gray.200"}
                zIndex={"50"}
                animate={{
                    width: sidebarWidth,
                    marginLeft: !isMobile ? sidebarPosition : "0px",
                    x: isMobile ? sidebarPosition : "0px",
                    transition: {
                        bounce: 0.15,
                    },
                }}
                overflow={"hidden"}
            >
                {loading ? (
                    <Center flexDir={"column"}>
                        <Text>Loading</Text>
                        <CircularProgress isIndeterminate color={"secondary"} />
                    </Center>
                ) : (
                    <>{user ? <CoreNav /> : <PublicNav />}</>
                )}
            </Flex>
        </>
    );
};

export default SideBar;
