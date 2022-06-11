import { useState, useEffect, FC } from "react";
import { useRouter } from "next/router";

import { Link } from "@chakra-ui/react";

interface NavDropdownLinkProps {
    href: string;
    text: string;
}

const NavDropdownLink: FC<NavDropdownLinkProps> = ({ href, text }) => {
    const router = useRouter();
    const [isActive, setIsActive] = useState<boolean>();

    useEffect(() => {
        setIsActive(router.pathname.substring(1) === href.substring(1));
    }, [router.pathname]);
    return (
        <Link
            h={"full"}
            textColor={isActive ? "primary.base" : "gray.500"}
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
    );
};

export default NavDropdownLink;
