import { FC, useState } from "react";
import Image from 'next/image';

import { Box, VStack } from "@chakra-ui/react";

import { AnimatePresence, motion } from "framer-motion";

import PublicHome from "./PublicHome";
import PublicNavLogin from "./PublicNavLogin";

import coreLogo from '@assets/CORE_logo.png';

const PublicNavWrapper: FC<{ mode: string; setMode: Function }> = ({
    mode,
    setMode,
}) => {
    const Home = <PublicHome onLogin={() => setMode("login")} />;

    switch (mode) {
        case "home":
            return <>{Home}</>;
        case "login":
            return <PublicNavLogin setMode={setMode} />;
        case "register":
            return null;
        default:
            return <>{Home}</>;
    }
};

const PublicNav: FC = () => {
    const [mode, setMode] = useState<string>("home");

    return (
        <VStack position={"relative"} py={"4"}>
            {/* <Box position={"relative"} objectFit={"cover"} p={"32"}>
                <Image src={coreLogo} layout={"fill"} objectFit={"contain"} />
            </Box> */}
            <Box position={"relative"} w={'full'}>
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
            </Box>
        </VStack>
    );
};

export default PublicNav;
