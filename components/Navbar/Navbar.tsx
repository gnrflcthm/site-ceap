import { FC, useEffect, useState } from "react";

import { useRouter } from "next/router";
import Image from "next/image";

import { Flex, Box, IconButton } from "@chakra-ui/react";
import { FaBars } from "react-icons/fa";

import NavMenu from "./NavMenu";

import logo from "../../assets/logo.png";

const Navbar: FC = () => {
    const [showNav, setShowNav] = useState<boolean>(true);
    const [mobile, setMobile] = useState<boolean>(false);

    const router = useRouter();

    useEffect(() => {
        setMobile(window.innerWidth < 768);
        setShowNav(window.innerWidth >= 768);

        const handleResize = () => {
            setMobile(window.innerWidth < 768);
            setShowNav(window.innerWidth >= 768);
        };

        router.events.on("routeChangeStart", () => {
            if (mobile) {
                setShowNav(false);
            }
        });

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return (
        <Flex
            borderBottom={"1px"}
            borderBottomColor={"gray.300"}
            position={"sticky"}
            top={0}
            justifyContent={"space-between"}
            alignItems={"stretch"}
            zIndex={"popover"}
            bg={"gray.100"}
        >
            <Flex p={2}>
                <Image src={logo} objectFit={"contain"} />
            </Flex>
            <Flex
                display={{ base: "block", lg: "none" }}
                alignSelf={"center"}
                pr={"2"}
            >
                <IconButton
                    icon={<FaBars />}
                    aria-label="Menu"
                    fontSize={"2xl"}
                    onClick={() => setShowNav(!showNav)}
                />
            </Flex>
            <NavMenu mobile={mobile} expand={showNav} />
        </Flex>
    );
};

export default Navbar;
