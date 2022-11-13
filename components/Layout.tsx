import { createContext, FC, PropsWithChildren, useMemo } from "react";

import SideBar from "@components/SideBar";
import TopBar from "@components/TopBar";

import { Flex, Box, Text, useBreakpoint } from "@chakra-ui/react";

export const MobileContext = createContext<boolean>(false);

const Layout: FC<PropsWithChildren> = ({ children }) => {
    const breakpoint = useBreakpoint();

    const isMobile = useMemo<boolean>(() => {
        return !["lg", "xl", "2xl"].includes(breakpoint);
    }, [breakpoint]);


    return (
        <Flex maxW={"100vw"} maxH={"100vh"} bg={"neutralizerLight"}>
            <MobileContext.Provider value={isMobile}>
                <SideBar />
                <Flex
                    flex={"1"}
                    flexDir={"column"}
                    w={"full"}
                    h={"100vh"}
                    maxH={"100vh"}
                    overflow={"hidden"}
                    align={"stretch"}
                >
                    <TopBar />
                    {children}
                </Flex>
            </MobileContext.Provider>
            {/* <Box
                rounded={"full"}
                position={"fixed"}
                right={"2"}
                bottom={"2"}
                bg={"secondary"}
                shadow={"lg"}
                p={"2"}
            >
                <Text fontWeight={"bold"}>{breakpoint}</Text>
            </Box> */}
        </Flex>
    );
};

export default Layout;
