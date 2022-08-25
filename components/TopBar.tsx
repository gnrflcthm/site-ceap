import { FC, useContext } from "react";

import Image from "next/image";
import Link from "next/link";

import { Flex, Box } from "@chakra-ui/react";
import {
    TbLayoutSidebarLeftCollapse,
    TbLayoutSidebarLeftExpand,
} from "react-icons/tb";

import coreNavLogo from "@assets/CORE_Nav.png";
import { CollapseContext } from "pages/_app";

const TopBar: FC = () => {
    const [collapsed, setCollapsed] = useContext(CollapseContext);
    return (
        <Flex
            w={"full"}
            borderBottom={"1px solid"}
            borderBottomColor={"blackAlpha.500"}
            bg={"primary"}
            justify={"flex-start"}
            align={"center"}
            px={"4"}
            position={"sticky"}
            top={"0"}
            h={"16"}
        >
            <Box as={"button"} onClick={() => setCollapsed(!collapsed)}>
                <Box
                    as={
                        collapsed
                            ? TbLayoutSidebarLeftExpand
                            : TbLayoutSidebarLeftCollapse
                    }
                    fontSize={"4xl"}
                    color={"neutralizerLight"}
                />
            </Box>
            <Link href={"/"} passHref>
                <Box as={"a"} position={"relative"} h={"60%"} w={"56"} mx={"4"}>
                    <Image
                        src={coreNavLogo}
                        layout={"fill"}
                        objectFit={"contain"}
                    />
                </Box>
            </Link>
        </Flex>
    );
};

export default TopBar;
