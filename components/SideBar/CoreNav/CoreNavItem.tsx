import { FC, useMemo } from "react";

import Link from "next/link";

import { Flex, Text, As } from "@chakra-ui/react";
import { useRouter } from "next/router";

const CoreNavItem: FC<{
    href?: string;
    name?: string;
    icon?: As;
    collapsed?: boolean;
}> = ({ href, name, icon, collapsed }) => {
    const { pathname } = useRouter();
    const isActive: boolean = useMemo(() => pathname === href, [pathname]);
    return (
        <Link href={href || "/"} passHref>
            <Flex
                w={"90%"}
                as={"a"}
                py={"4"}
                px={collapsed ? "4" : "6"}
                color={"neutralizerLight"}
                bg={isActive ? "secondary" : "transparent"}
                boxShadow={isActive ? "md" : "none"}
                rounded={"xl"}
                position={"relative"}
                align={"center"}
                justify={collapsed ? "center" : "initial"}
                _hover={
                    !isActive
                        ? {
                              _after: {
                                  content: `""`,
                                  position: "absolute",
                                  rounded: "xl",
                                  h: "full",
                                  w: "full",
                                  top: 0,
                                  left: 0,
                                  bg: "whiteAlpha.100",
                              },
                              color: "secondary",
                              boxShadow: "md",
                          }
                        : {}
                }
                // transition={"all 0.2s ease"}
            >
                <Flex
                    as={icon}
                    color={"inherit"}
                    justify={"center"}
                    align={"center"}
                    h={"full"}
                    mr={collapsed ? "0" : "8"}
                    fontSize={"xl"}
                />
                <Text fontSize={"xl"} display={collapsed ? "none" : "block"}>
                    {name}
                </Text>
            </Flex>
        </Link>
    );
};

export default CoreNavItem;
