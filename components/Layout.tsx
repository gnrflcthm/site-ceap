import { FC, PropsWithChildren } from "react";

import { useRouter } from "next/router";

import Navbar from "./Navbar";
import Footer from "./Footer/Footer";
import { Box } from "@chakra-ui/react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    return (
        <Box position={"absolute"} top={"0"} w={"full"} pt={["/home", "/"].includes(router.pathname) ? "4" : "initial"}>
            <Navbar />
            <Box mt={["/home", "/"].includes(router.pathname) ? "-24" : "initial"}>{children}</Box>
            <Footer />
        </Box>
    );
};

export default Layout;
