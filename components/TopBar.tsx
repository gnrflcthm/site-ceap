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
            h={{base: "14", lg: "16"}}
            minH={{base: "14", lg: "16"}}
            maxH={{base: "14", lg: "16"}}
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
                    fontSize={{base: "2xl", lg: "4xl"}}
                    color={"neutralizerLight"}
                />
            </Box>
            <Link href={"/"} passHref>
                <Box as={"a"} position={"relative"} h={{base: "50%", lg: "60%"}} w={"56"} mx={"4"}>
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
