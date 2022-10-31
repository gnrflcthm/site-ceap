import { VStack } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

const Modal: FC<PropsWithChildren> = ({ children }) => {
    return (
        <VStack
            onClick={(e) => e.stopPropagation()}
            align={"stretch"}
            bg={"neutralizerLight"}
            rounded={"md"}
            w={{base: "90%", lg: "50%", xl: "35%"}}
        >
            {children}
        </VStack>
    );
};

export default Modal;