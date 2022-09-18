import { FC, useContext, useEffect, useRef } from "react";

import {
    Flex,
    useBreakpoint,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    useDisclosure,
    DrawerContent,
} from "@chakra-ui/react";

import CoreNav from "./CoreNav";
import PublicNav from "./PublicNav";
import { CollapseContext } from "pages/_app";
import { AuthContext } from "@context/AuthContext";
import { Router } from "next/router";

const SideBar: FC = () => {
    const [collapsed, setCollapsed] = useContext(CollapseContext);
    const { isOpen, onClose, onOpen } = useDisclosure({
        isOpen: !collapsed,
        onOpen: () => {
            setCollapsed(false);
        },
        onClose: () => {
            setCollapsed(true);
        },
    });

    const sidebar = useRef<HTMLDivElement>(null);

    const { loading, user } = useContext(AuthContext);

    const breakpoint = useBreakpoint();

    useEffect(() => {
        const handleRouteChange = () =>
            setCollapsed(true && !["lg", "xl", "2xl"].includes(breakpoint));
        Router.events.on("routeChangeComplete", handleRouteChange);
        return () => {
            Router.events.off("routeChangeComplete", handleRouteChange);
        };
    }, []);

    switch (breakpoint) {
        case "lg":
        case "xl":
        case "2xl":
            return (
                <Flex
                    ref={sidebar}
                    flexDir={"column"}
                    align={"stretch"}
                    minH={"100vh"}
                    bg={"gray.200"}
                    transition={"all 0.2s ease"}
                    w={collapsed && user ? "5%" : "20%"}
                    borderRight={"1px solid"}
                    borderRightColor={
                        collapsed && !user ? "none" : "blackAlpha.400"
                    }
                    overflow={"hidden"}
                    ml={
                        collapsed && !user
                            ? `-${sidebar?.current?.clientWidth}px`
                            : "0"
                    }
                >
                    <>{user ? <CoreNav /> : <PublicNav />}</>
                </Flex>
            );

        default:
            return (
                <Drawer
                    isOpen={isOpen}
                    onClose={onClose}
                    onOverlayClick={() => onClose()}
                    placement={"left"}
                    size={"xs"}
                >
                    <DrawerOverlay />
                    <DrawerContent bg={"neutralizerLight"}>
                        <DrawerBody
                            px={"0"}
                            h={"full"}
                            overflowX={"hidden"}
                            overflowY={"auto"}
                        >
                            {loading ? (
                                <>Loading</>
                            ) : (
                                <>{user ? <CoreNav /> : <PublicNav />}</>
                            )}
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            );
    }
};

export default SideBar;
