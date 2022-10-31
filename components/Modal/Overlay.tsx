import { Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FC, PropsWithChildren } from "react";

const Overlay: FC<PropsWithChildren & { onClick?: Function }> = ({
    children,
    onClick = () => {},
}) => {
    return (
        <Center
            onClick={() => onClick()}
            h={"100vh"}
            w={"100vw"}
            bg={"blackAlpha.400"}
            zIndex={"modal"}
            position={"absolute"}
            top={"0"}
            left={"0"}
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {children}
        </Center>
    );
};

export default Overlay;
