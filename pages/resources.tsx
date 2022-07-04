import { useState } from "react";

import { NextPage } from "next";

import { Flex, Text } from "@chakra-ui/react";

import { GroupsPanel, SubGroupsPanel, ResourcesPanel } from "../components/Resources";

const Resources: NextPage = () => {
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const [selectedSubgroup, setSelectedSubgroup] = useState<string>("");

    const selectGroup = (group: string) => {
        setSelectedGroup(group);
        setSelectedSubgroup("");
    };

    const selectSubgroup = (subgroup: string) => {
        setSelectedSubgroup(subgroup);
    };

    return (
        <Flex alignItems={"stretch"} justifyContent={"space-between"}>
            <GroupsPanel
                selectGroup={selectGroup}
                currentSelected={selectedGroup}
            />
            <SubGroupsPanel selectSubgroup={selectSubgroup} currentSubGroup={selectedSubgroup} currentGroup={selectedGroup} />
            <ResourcesPanel currentSubGroup={selectedSubgroup} />
        </Flex>
    );
};

export default Resources;
