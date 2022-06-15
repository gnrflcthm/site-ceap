import { FC } from "react";

import { Accordion, Flex, VStack } from "@chakra-ui/react";

import { AnimatePresence, motion } from "framer-motion";

import NavLink from "./NavLink";
import NavDropdown from "./NavDropdown";
import NavDropdownLink from "./NavDropdownLink";
import MobileNavLink from "./MobileNavLink";
import MobileDropdown from "./MobileDropdown";

interface NavMenuProps {
    mobile: boolean;
    expand: boolean;
}

const NavMenu: FC<NavMenuProps> = ({ mobile, expand }) => {
    if (mobile) {
        return (
            <AnimatePresence>
                {expand && (
                    <Accordion
                        allowToggle={true}
                        p={0}
                        position={"absolute"}
                        top={"100%"}
                        left={"0"}
                        alignItems={"stretch"}
                        w={"full"}
                        bg={"blue.300"}
                        as={motion.div}
                        initial={{ height: "0%" }}
                        animate={{
                            height: "fit-content"
                        }}
                        exit={{ height: "0%" }}
                        overflow={"hidden"}
                    >
                        <MobileNavLink href="/" text="Home" />
                        <MobileDropdown href="/about" text="About">
                            <MobileNavLink
                                href="/about/ceap"
                                text="About CEAP"
                                indent={"6"}
                            />
                            <MobileNavLink
                                href="/"
                                text="History"
                                indent={"6"}
                            />
                            <MobileNavLink
                                href="/"
                                text="Vision, Mission, Core Values"
                                indent={"6"}
                            />
                            <MobileNavLink
                                href="/"
                                text="Strategic Directions"
                                indent={"6"}
                            />
                            <MobileNavLink
                                href="/"
                                text="Board Of Trustees"
                                indent={"6"}
                            />
                            <MobileNavLink
                                href="/"
                                text="Comission & Commitees"
                                indent={"6"}
                            />
                            <MobileNavLink
                                href="/"
                                text="National Secretariat"
                                indent={"6"}
                            />
                        </MobileDropdown>
                        <MobileDropdown href="/news" text="News & Events">
                            <MobileNavLink
                                href="/news"
                                text="News"
                                indent={"6"}
                            />
                            <MobileNavLink
                                href="/events/photos"
                                text="Photo Gallery"
                                indent={"6"}
                            />
                            <MobileNavLink
                                href="/events/videos"
                                text="Video Gallery"
                                indent={"6"}
                            />
                        </MobileDropdown>
                        <MobileNavLink
                            href="/member-schools"
                            text="Member Schools"
                        />
                        <MobileNavLink href="/resources" text="Resources" />
                        <MobileNavLink href="/contact" text="Contact Us" />
                    </Accordion>
                )}
            </AnimatePresence>
        );
    } else {
        return (
            <Flex alignItems={"center"} justifyContent={"space-around"}>
                <NavLink href="/" text="Home" />
                <NavDropdown href="/about" text="About">
                    <NavDropdownLink href="/about/ceap" text="About CEAP" />
                    <NavDropdownLink href="/" text="History" />
                    <NavDropdownLink
                        href="/"
                        text="Vision, Mission, Core Values"
                    />
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
