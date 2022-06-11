import { FC, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/router";

import { Button, Box, Flex } from "@chakra-ui/react";

import { AnimatePresence, motion } from "framer-motion";

import NavLink from "./NavLink";

interface NavDropdownProps {
    href: string;
    text: string;
    children: ReactNode[];
}

const NavDropdown: FC<NavDropdownProps> = ({ href, text, children }) => {
    const [isActive, setIsActive] = useState<boolean>(false);
    const [show, setShow] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        setIsActive(router.pathname.substring(1) === href.substring(1));
    }, [router.pathname]);
    return (
        <Flex
            onMouseEnter={() => setShow(true)}
            onMouseLeave={() => setShow(false)}
            onClick={() => setShow(true)}
            h={"100%"}
            alignItems={"center"}
            position={"relative"}
        >
            <NavLink navigate={false} href={href} text={text} />
            <AnimatePresence>
                {show && (
                    <Flex
                        flexDir={"column"}
                        position={"absolute"}
                        bg="green.200"
                        top={"100%"}
                        left={"0"}
                        as={motion.div}
                        initial={{ height: "0%" }}
                        animate={{ height: "fit-content" }}
                        borderBottomRadius={"md"}
                        exit={{
                            height: "0%",
                            transition: {
                                delay: children.length * 0.02,
                            },
                        }}
                    >
                        {children.map((node, i) => {
                            return (
                                <Box
                                    whiteSpace={"nowrap"}
                                    _hover={{ bg: "orange.100" }}
                                    as={motion.div}
                                    initial={{ y: -5, opacity: 0 }}
                                    animate={{
                                        y: 0,
                                        opacity: 1,
                                        transition: {
                                            delay: i * 0.03,
                                            duration: children.length / 2 * 0.01
                                        },
                                    }}
                                    exit={{
                                        y: -5,
                                        opacity: 0,
                                        transition: {
                                            delay: (children.length - i) * 0.03,
                                            duration: children.length / 2 * 0.01
                                        },
                                    }}
                                >
                                    {node}
                                </Box>
                            );
                        })}
                    </Flex>
                )}
            </AnimatePresence>
        </Flex>
    );
};

export default NavDropdown;
