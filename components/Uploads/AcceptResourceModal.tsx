import { Center, Flex } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FC } from "react";

const AcceptResourceModal: FC = () => {
    return (
        <Center
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
            onClick={() => close()}
        >
            <Flex
                onClick={(e) => e.stopPropagation()}
                flexDir={"column"}
                align={"stretch"}
                bg={"neutralizerLight"}
                rounded={"md"}
                p={"8"}
                w={"25%"}
            ></Flex>
        </Center>
    );
};

export default AcceptResourceModal;
