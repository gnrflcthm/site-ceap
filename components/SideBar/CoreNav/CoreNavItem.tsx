import { FC, useMemo, useContext, MouseEventHandler } from "react";
import { CollapseContext } from "pages/_app";

import Link from "next/link";

import { Flex, Text, As, Tooltip, Box, useBreakpoint } from "@chakra-ui/react";
import { useRouter } from "next/router";

interface CoreNavItemBaseProps {
    name?: string;
    icon?: As;
    bg?: string;
    color?: string;
}

interface CoreNavItemLink extends CoreNavItemBaseProps {
    href: string;
    onClick?: never;
}

interface CoreNavItemButton extends CoreNavItemBaseProps {
    onClick: MouseEventHandler;
    href?: never;
}

type CoreNavItemProps = CoreNavItemLink | CoreNavItemButton;

const CoreNavItemContent: FC<{
    collapsed: boolean;
    isActive: boolean;
    icon?: As;
    name?: string;
    bg?: string;
    color?: string;
}> = ({ collapsed, isActive, icon, name, bg, color }) => {
    const breakpoint = useBreakpoint();

    return (
        <Flex
            py={"4"}
            px={{ base: "8", lg: collapsed ? "4" : "6" }}
            color={color || "neutralizerDark"}
            bg={bg ? bg : isActive ? "secondary" : "transparent"}
            boxShadow={isActive ? "md" : "none"}
            rounded={{ base: "none", lg: "xl" }}
            position={"relative"}
            align={"center"}
            justify={collapsed ? "center" : "initial"}
            cursor={"pointer"}
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
                          color: color || "secondary",
                          boxShadow: "md",
                      }
                    : {}
            }
            transition={"all 0.2s ease"}
        >
            <Flex
                as={icon}
                color={"inherit"}
                justify={"center"}
                align={"center"}
                h={"full"}
                mr={{ base: "4", lg: collapsed ? "0" : "8" }}
                fontSize={"xl"}
            />
            <Text
                fontSize={"xl"}
                display={collapsed ? "none" : "block"}
                color={"inherit"}
            >
                {name}
            </Text>
        </Flex>
    );
};

const CoreNavItem: FC<CoreNavItemProps> = ({
    href,
    onClick,
    name,
    icon,
    bg,
    color,
}) => {
    const [collapsed] = useContext(CollapseContext);
    const { pathname } = useRouter();
    const isActive: boolean = useMemo(() => pathname === href, [pathname]);

    return (
        <Tooltip
            label={name}
            placement={"right"}
            isDisabled={!collapsed}
            hasArrow
        >
            <Box w={{ base: "full", lg: "90%" }}>
                {href ? (
                    <Link href={href} passHref>
                        <Box as={"a"} w={"full"}>
                            <CoreNavItemContent
                                {...{
                                    collapsed,
                                    isActive,
                                    icon,
                                    name,
                                    bg,
                                    color,
                                }}
                            />
                        </Box>
                    </Link>
                ) : (
                    <Box as={"button"} onClick={onClick} w={"full"}>
                        <CoreNavItemContent
                            {...{ collapsed, isActive, icon, name, bg, color }}
                        />
                    </Box>
                )}
            </Box>
        </Tooltip>
    );
};

export default CoreNavItem;
