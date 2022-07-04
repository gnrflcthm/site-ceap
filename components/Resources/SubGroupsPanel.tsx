import { FC } from "react";

import { Flex, Text } from "@chakra-ui/react";

import PanelItem from "./PanelItem";

interface SubGroupsPanelProps {
    currentSubGroup: string;
    currentGroup: string;
    selectSubgroup: Function;
}

const SubGroupsPanel: FC<SubGroupsPanelProps> = ({
    currentSubGroup,
    selectSubgroup,
    currentGroup,
}) => {
    return (
        <Flex
            w={"33%"}
            flexDir={"column"}
            justifyContent={currentGroup === "" ? "center" : "flex-start"}
        >
            {currentGroup === "" ? (
                <Text textAlign={"center"}>No Selected Group</Text>
            ) : (
                <PanelItem
                    text={"Hatdog"}
                    onClick={() => selectSubgroup("Hatdog")}
                />
            )}
        </Flex>
    );
};

export default SubGroupsPanel;
