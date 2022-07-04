import { FC } from "react";

import { Flex, Heading, VStack, Box } from "@chakra-ui/react";

import PanelItem from "./PanelItem";

interface GroupsPanelProps {
    selectGroup: Function;
    currentSelected: string;
}

const GroupsPanel: FC<GroupsPanelProps> = ({
    selectGroup: setSelectedGroup,
    currentSelected,
}) => {
    return (
        <Flex
            justifyContent={"flex-start"}
            alignItems={"stretch"}
            flexDir={"column"}
            w={"33%"}
            py={"4"}
            maxH={"100vh"}
            minH={"100vh"}
            overflowX={"hidden"}
            overscrollY={"auto"}
        >
            <Heading>Search</Heading>
            <VStack w={"full"} spacing={"0"}>
                <PanelItem
                    text={
                        "2021 CEAP Child Protection Summit (March 25 to 27, 2021)"
                    }
                    onClick={() =>
                        setSelectedGroup(
                            currentSelected ===
                                "2021 CEAP Child Protection Summit (March 25 to 27, 2021)"
                                ? ""
                                : "2021 CEAP Child Protection Summit (March 25 to 27, 2021)"
                        )
                    }
                />
                <PanelItem
                    text={"2021 CEAP National JEEPGY Conference"}
                    onClick={() =>
                        setSelectedGroup(
                            currentSelected ===
                                "2021 CEAP National JEEPGY Conference"
                                ? ""
                                : "2021 CEAP National JEEPGY Conference"
                        )
                    }
                />
            </VStack>
        </Flex>
    );
};

export default GroupsPanel;
