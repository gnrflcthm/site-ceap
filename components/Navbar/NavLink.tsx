import { useState, useEffect, FC, MouseEventHandler } from "react";

import NextLink from "next/link";
import { useRouter } from "next/router";

import { Link } from "@chakra-ui/react";

interface NavLinkProps {
    href: string;
    text: string;
    navigate?: boolean;
}

const NavLink: FC<NavLinkProps> = ({ href, text, navigate = true }) => {
    const router = useRouter();
    const [isActive, setIsActive] = useState<boolean>();

    useEffect(() => {
        setIsActive(router.pathname.substring(1).split("/")[0] === href.substring(1));
    }, [router.pathname]);

    if (navigate) {
        return (
            <NextLink href={href} passHref>
                <Link
                    h={"full"}
                    px={{ base: "0", lg: "8" }}
                    textColor={isActive ? "primary.base" : "gray.500"}
                    fontSize={"14"}
                    fontWeight={"600"}
                    _hover={{ color: "primary.base", textDecor: "none" }}
                    transition={"all 0.2s ease-in-out"}
                    display={"inline-flex"}
                    flexDir={"column"}
                    justifyContent={"center"}
                >
                    {text}
                </Link>
            </NextLink>
        );
    } else {
        return (
            <Link
                h={"full"}
                textColor={isActive ? "primary.base" : "gray.500"}
                fontSize={"14"}
                fontWeight={"600"}
                px={{ base: "0", lg: "8" }}
                _hover={{ color: "primary.base", textDecor: "none" }}
                transition={"all 0.2s ease-in-out"}
                display={"inline-flex"}
                flexDir={"column"}
                justifyContent={"center"}
            >
                {text}
            </Link>
        );
    }
};

export default NavLink;
