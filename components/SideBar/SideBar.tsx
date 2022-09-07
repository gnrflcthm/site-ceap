import { FC, useContext } from "react";

import { Flex } from "@chakra-ui/react";

import CoreNav from "./CoreNav";
import PublicNav from "./PublicNav";
import { CollapseContext } from "pages/_app";
import { AuthContext } from "@context/AuthContext";

const SideBar: FC = () => {
    const [collapsed] = useContext(CollapseContext);
    const { loading, user } = useContext(AuthContext);

    return (
        <Flex
            flexDir={"column"}
            align={"stretch"}
            minH={"100vh"}
            px={collapsed ? "2" : "0"}
            bg={"gray.200"}
            transition={"all 0.2s ease"}
            w={collapsed ? "5%" : "20%"}
            borderRight={"1px solid"}
            borderRightColor={"blackAlpha.400"}
        >
            {loading ? <>Loading</> : <>{user ? <CoreNav /> : <PublicNav />}</>}
        </Flex>
    );
};

export default SideBar;
