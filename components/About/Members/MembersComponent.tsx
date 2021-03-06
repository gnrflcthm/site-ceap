import { FC, MouseEventHandler } from "react";

import { Button } from "@chakra-ui/react";

interface HistoryNavProps {
    title: string;
    active: boolean;
    onClick?: MouseEventHandler;
}

const Members: FC<HistoryNavProps> = ({ title, active, onClick }) => {
    return (
        <Button
            rounded={"0"} size='lg' ml={"5"} mb={"10"} as='i' color={active ? "primary" : "white"} bg={active ? "neutralizerWhite" : "primary"}
            onClick={onClick}
        >
            {title}
        </Button>
    );
};

export default Members;
