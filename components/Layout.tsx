import { FC, PropsWithChildren } from "react";

import SideBar from "@components/SideBar";
import TopBar from "@components/TopBar";

import { Flex } from "@chakra-ui/react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
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
        </Flex>
    );
};

export default Layout;
