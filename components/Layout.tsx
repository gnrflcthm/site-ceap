import { FC, PropsWithChildren } from "react";

import SideBar from "@components/SideBar";
import TopBar from "@components/TopBar";

import { Flex, VStack } from "@chakra-ui/react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <Flex
            maxW={"100vw"}
            maxH={"100vh"}
            bg={"neutralizerLight"}
        >
            <SideBar />
            <Flex flexDir={"column"} maxH={"100vh"} flex={"1"}>
                <TopBar />
                {children}
            </Flex>
        </Flex>
    );
};

export default Layout;
