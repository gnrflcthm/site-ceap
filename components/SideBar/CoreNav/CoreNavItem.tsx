import { FC, useMemo, useContext, MouseEventHandler } from "react";
import { CollapseContext } from "pages/_app";

import Link from "next/link";

import { Flex, Text, As, Tooltip, Box, useBreakpoint } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { MobileContext } from "@components/Layout";

interface CoreNavItemBaseProps {
    name?: string;
    icon?: As;
    bg?: string;
    color?: string;
    matches?: RegExp;
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
    return (
        <Flex
            py={"4"}
            px={{ base: "8", lg: collapsed ? "4" : "6" }}
            color={color || isActive ? "neutralizerLight" : "neutralizerDark"}
            bg={bg ? bg : isActive ? "primary" : "transparent"}
            boxShadow={isActive ? "md" : "none"}
            rounded={{ base: "none", lg: "xl" }}
            position={"relative"}
            align={"center"}
            justify={{ base: "initial", lg: collapsed ? "center" : "initial" }}
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
                display={{ base: "block", lg: collapsed ? "none" : "block" }}
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
    matches,
}) => {
    const [collapsed] = useContext(CollapseContext);
    const { pathname } = useRouter();
    const isActive: boolean = useMemo(() => {
        if (matches) {
            return matches.test(pathname || "^.^") || pathname === href;
        }
        return pathname === href;
    }, [pathname]);
    const isMobile = useContext(MobileContext);

    return (
        <Tooltip
            label={name}
            placement={"right"}
            isDisabled={!collapsed || isMobile}
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
