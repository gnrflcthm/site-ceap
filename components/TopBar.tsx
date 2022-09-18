import { FC, useContext } from "react";

import Image from "next/image";
import Link from "next/link";

import { Flex, Box, useBreakpoint } from "@chakra-ui/react";
import {
    TbLayoutSidebarLeftCollapse,
    TbLayoutSidebarLeftExpand,
} from "react-icons/tb";
import { FaBars } from "react-icons/fa";

import coreNavLogo from "@assets/CORE_Nav.png";
import { CollapseContext } from "pages/_app";

const TopBar: FC = () => {
    const [collapsed, setCollapsed] = useContext(CollapseContext);
    const breakpoint = useBreakpoint();

    return (
        <Flex
            w={"full"}
            borderBottom={"1px solid"}
            borderBottomColor={"blackAlpha.500"}
            bg={"primary"}
            justify={{ base: "center", lg: "flex-start" }}
            align={"center"}
            px={"4"}
            position={"sticky"}
            top={"0"}
            h={"16"}
            minH={"16"}
            maxH={"16"}
        >
            <Box
                as={"button"}
                position={{ base: "absolute", lg: "relative" }}
                onClick={() => setCollapsed(!collapsed)}
                left={"4"}
            >
                <Box
                    as={
                        !["lg", "xl", "2xl"].includes(breakpoint)
                            ? FaBars
                            : collapsed
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
