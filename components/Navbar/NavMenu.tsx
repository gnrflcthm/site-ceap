import { FC } from "react";

import { Flex, Text } from "@chakra-ui/react";

import NavLink from "./NavLink";
import NavDropdown from "./NavDropdown";
import NavDropdownLink from './NavDropdownLink';

interface NavMenuProps {
    mobile: boolean;
}

const NavMenu: FC<NavMenuProps> = ({ mobile }) => {
    if (mobile) {
        return <></>;
    } else {
        return (
            <Flex alignItems={"center"} justifyContent={"space-around"}>
                <NavLink href="/" text="Home" />
                <NavDropdown href="/about" text="About">
                    <NavDropdownLink href="/" text="About CEAP" />
                    <NavDropdownLink href="/" text="History" />
                    <NavDropdownLink href="/" text="Vision, Mission, Core Values" />
                    <NavDropdownLink href="/" text="Strategic Directions" />
                    <NavDropdownLink href="/" text="Board Of Trustees" />
                    <NavDropdownLink href="/" text="Comission & Commitees" />
                    <NavDropdownLink href="/" text="National Secretariat" />
                </NavDropdown>
                <NavDropdown href="/info" text="News & Events">
                    <NavDropdownLink href="/" text="News" />
                    <NavDropdownLink href="/" text="Photo Gallery" />
                    <NavDropdownLink href="/" text="Video Gallery" />
                </NavDropdown>
                <NavLink href="/member-schools" text="Member Schools" />
                <NavLink href="/resources" text="Resources" />
                <NavLink href="/contact" text="Contact Us" />
            </Flex>
        );
    }
};

export default NavMenu;
