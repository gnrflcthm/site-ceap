import { FC, MouseEventHandler, PropsWithChildren } from "react";

import { Button } from "@chakra-ui/react";

interface HistoryNavProps {
    title: string;
    active: boolean;
    onClick?: MouseEventHandler;
}

const HistoryNav: FC<HistoryNavProps> = ({ title, active, onClick }) => {
    return (
        <Button
            borderBottomRadius={"none"}
            bg={active ? "primary" : "textOnPrimary"}
            h={active ? "100%" : "initial"}
            color={active ? "textOnPrimary" : "primary"}
            flex={"1"}
            py={"4"}
            onClick={onClick}
        >
            {title}
        </Button>
    );
};

export default HistoryNav;
