import { FC } from "react";

import { Flex, Heading, VStack, Box } from "@chakra-ui/react";

import PanelItem from "./PanelItem";

interface GroupsPanelProps {
    groups: string[];
    selectGroup: Function;
    currentSelected: string;
}

const GroupsPanel: FC<GroupsPanelProps> = ({
    groups,
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
            <Heading textAlign={"center"} my={"4"}>
                Group
            </Heading>
            <VStack w={"full"} spacing={"0"}>
                {groups.map((group, idx) => (
                    <PanelItem
                        key={idx}
                        text={group}
                        onClick={() =>
                            setSelectedGroup(
                                currentSelected === group ? "" : group
                            )
                        }
                    />
                ))}
            </VStack>
        </Flex>
    );
};

export default GroupsPanel;
