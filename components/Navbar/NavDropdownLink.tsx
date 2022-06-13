import { FC } from "react";

import NextLink from "next/link";

import { Link } from "@chakra-ui/react";

interface NavDropdownLinkProps {
    href: string;
    text: string;
}

const NavDropdownLink: FC<NavDropdownLinkProps> = ({ href, text }) => (
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
            px={"4"}
            py={"2"}
        >
            {text}
        </Link>
    </NextLink>
);

export default NavDropdownLink;
