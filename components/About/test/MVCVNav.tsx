import { FC, MouseEventHandler } from "react";

import { Button } from "@chakra-ui/react";

interface MVCVNavProps {
    title: string;
    active: boolean;
    onClick?: MouseEventHandler;
}

const MVCVNav: FC<MVCVNavProps> = ({ title, active, onClick }) => {
    return (
        <Button
            rounded={"0"}
            color={active ? "primary" : "textOnPrimary"}
            bg={active ? "secondary" : "primary"}
            onClick={onClick}
            cursor={"pointer"}
            _hover={{
                bg: "secondary",
                color: "primary",
            }}
        >
            {title}
        </Button>
    );
};

export default MVCVNav;
