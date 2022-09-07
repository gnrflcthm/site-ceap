import { FC, useState } from "react";
import Image from "next/image";

import { Box, Center, CircularProgress, Text } from "@chakra-ui/react";

import { AnimatePresence, motion } from "framer-motion";

import PublicHome from "./PublicHome";
import Login from "./Login";

import ForgotPassword from "./ForgotPassword";

const PublicNavWrapper: FC<{ mode: string; setMode: Function }> = ({
    mode,
    setMode,
}) => {
    switch (mode) {
        case "login":
            return <Login setMode={setMode} />;
        case "forgot-password":
            return <ForgotPassword setMode={setMode} />;
        default:
            return <PublicHome onLogin={() => setMode("login")} />;
    }
};

const PublicNav: FC = () => {
    const [mode, setMode] = useState<string>("home");

    return (
        <Center position={"relative"} w={"full"} h={"full"} py={"10"}>
            <AnimatePresence>
                <Box
                    px={"4"}
                    key={mode}
                    as={motion.div}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    position={"absolute"}
                    w={"full"}
                >
                    <PublicNavWrapper {...{ mode, setMode }} />
                </Box>
            </AnimatePresence>
        </Center>
    );
};

export default PublicNav;
