import { useState, useEffect, FC } from "react";

import { useRouter } from "next/router";
import NextLink from "next/link";

import { Flex, Link } from "@chakra-ui/react";

interface MobileNavLinkProps {
    href: string;
    text: string;
    navigate?: boolean;
    indent?: number | string
}

const MobileNavLink: FC<MobileNavLinkProps> = ({
    href,
    text,
    navigate = true,
    indent = 4
}) => {
    const router = useRouter();
    const [isActive, setIsActive] = useState<boolean>();

    useEffect(() => {
        setIsActive(router.pathname.substring(1) === href.substring(1));
    }, [router.pathname]);

    if (navigate) {
        return (
            <Flex
                w={"full"}
                alignItems={"center"}
                _hover={{ bg: "blackAlpha.50" }}
                bg={isActive ? "blackAlpha.50" : ""}
            >
                <NextLink href={href} passHref>
                    <Link
                        h={"full"}
                        textColor={"primary.base"}
                        fontSize={"14"}
                        fontWeight={"600"}
                        _hover={{ color: "primary.base", textDecor: "none" }}
                        transition={"all 0.2s ease-in-out"}
                        display={"inline-flex"}
                        flexDir={"column"}
                        justifyContent={"center"}
                        w={"full"}
                        px={indent}
                        py={"2"}
                    >
                        {text}
                    </Link>
                </NextLink>
            </Flex>
        );
    } else {
        return (
            <Flex
                w={"full"}
                alignItems={"center"}
            >
                <Link
                    h={"full"}
                    textColor={"primary.base"}
                    fontSize={"14"}
                    fontWeight={"600"}
                    _hover={{ color: "primary.base", textDecor: "none" }}
                    transition={"all 0.2s ease-in-out"}
                    display={"inline-flex"}
                    flexDir={"column"}
                    justifyContent={"center"}
                    textAlign={"start"}
                    w={"full"}
                    px={indent}
                    py={"2"}
                >
                    {text}
                </Link>
            </Flex>
        );
    }
};

export default MobileNavLink;
