import { Button } from "@chakra-ui/react";
import { FC, PropsWithChildren } from "react";

const TabButton: FC<
    PropsWithChildren & { isActive?: boolean; onClick: Function }
> = ({ children, isActive = false, onClick }) => {
    return (
        <Button
            rounded={"full"}
            onClick={() => onClick()}
            bg={isActive ? "secondary" : "initial"}
            w={'fit-content'}
            mx={'1'}
            color={isActive ? "neutralizerLight": "neutralizerDark"}
            borderColor={isActive ? "transparent" : "neutralizerDark"}
            _hover={{
                bg: "secondary",
                borderColor: "transparent",
                color: "neutralizerLight"
            }}
        >
            {children}
        </Button>
    );
};

export default TabButton;
