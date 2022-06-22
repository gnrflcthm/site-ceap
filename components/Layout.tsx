import { FC, PropsWithChildren } from "react";

import { useRouter } from "next/router";

import Header from "./Header";
import Footer from "./Footer";
import { Box } from "@chakra-ui/react";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    const router = useRouter();
    return (
        <Box position={"absolute"} top={"0"} w={"full"}>
            <Header />
            {children}
            <Footer />
        </Box>
    );
};

export default Layout;
