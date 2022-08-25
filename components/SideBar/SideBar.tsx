import { FC, useContext, useState } from "react";

import { Flex } from "@chakra-ui/react";

import { FaAngleDoubleLeft, FaAngleDoubleRight } from "react-icons/fa";

import CoreNav from "./CoreNav";
import PublicNav from "./PublicNav";
import { CollapseContext } from "pages/_app";

const SideBar: FC = () => {
    const [collapsed, setCollapsed] = useContext(CollapseContext);
    const [user, setUser] = useState<boolean>(false); // Temp

    return (
        <Flex
            flexDir={"column"}
            align={"stretch"}
            minH={"100vh"}
            px={collapsed ? "2" : "0"}
            bg={"secondary"}
            transition={"all 0.2s ease"}
            w={collapsed ? "5%" : "20%"}
            borderRight={"1px solid"}
            borderRightColor={"blackAlpha.400"}
        >
        </Flex>
    );
};

export default SideBar;
