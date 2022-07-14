import { FC } from "react";

import { Flex, Text, CircularProgress, Heading } from "@chakra-ui/react";

import PanelItem from "./PanelItem";

interface SubGroupsPanelProps {
    subgroups: string[];
    isLoading: boolean;
    currentSubGroup: string;
    currentGroup: string;
    selectSubgroup: Function;
}

const SubGroupsPanel: FC<SubGroupsPanelProps> = ({
    subgroups,
    isLoading,
    currentSubGroup,
    selectSubgroup,
    currentGroup,
}) => {
    return (
        <Flex
            alignItems={"stretch"}
            flexDir={"column"}
            w={"33%"}
            py={"4"}
            maxH={"100vh"}
            minH={"100vh"}
            overflowX={"hidden"}
            overscrollY={"auto"}
            justifyContent={"flex-start"}
        >
            <Heading textAlign={"center"} my={"4"}>
                Sub Group
            </Heading>
            <Flex
                flexDir={"column"}
                justifyContent={currentGroup === "" || isLoading ? "center" : "flex-start"}
                flex={"1"}
            >
                {isLoading ? (
                    <CircularProgress
                        isIndeterminate
                        display={"block"}
                        alignSelf={"center"}
                    />
                ) : currentGroup === "" ? (
                    <Text textAlign={"center"}>No Selected Group</Text>
                ) : (
                    subgroups.map((subgroup, idx) => (
                        <PanelItem
                            key={idx}
                            text={subgroup}
                            onClick={() =>
                                selectSubgroup(
                                    currentSubGroup === "" ? subgroup : ""
                                )
                            }
                        />
                    ))
                )}
            </Flex>
        </Flex>
    );
};

export default SubGroupsPanel;
