import { FC, PropsWithChildren } from "react";

import SideBar from "@components/SideBar";
import TopBar from "@components/TopBar";

import { Flex, Box, Text, useBreakpoint } from "@chakra-ui/react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    const breakpoint = useBreakpoint();

    return (
        <Flex maxW={"100vw"} maxH={"100vh"} bg={"neutralizerLight"}>
            <SideBar />
            <Flex
                flexDir={"column"}
                h={"100vh"}
                maxH={"100vh"}
                flex={"1"}
                w={"full"}
                overflow={"hidden"}
            >
                <TopBar />
                {children}
            </Flex>
            <Box
                rounded={"full"}
                position={"fixed"}
                right={"2"}
                bottom={"2"}
                bg={"secondary"}
                shadow={"lg"}
                p={"2"}
            >
                <Text fontWeight={"bold"}>{breakpoint}</Text>
            </Box>
        </Flex>
    );
};

export default Layout;
