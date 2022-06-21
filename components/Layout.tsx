import { FC, PropsWithChildren } from "react";

import { useRouter } from "next/router";

import Navbar from "./Navbar/Navbar";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    return (
        <Box position={"absolute"} top={"0"} w={"full"}>
            <Navbar
                offSet={["/", "/home"].includes(router.pathname) ? "50vh" : "0"}
            />
            {children}
            <Footer />
        </Box>
    );
};

export default Layout;
