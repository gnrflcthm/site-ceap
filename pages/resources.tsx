import { useEffect, useState } from "react";

import {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
    NextPage,
} from "next";

import { Flex } from "@chakra-ui/react";

import { prisma } from "../prisma/db";

import {
    GroupsPanel,
    SubGroupsPanel,
    ResourcesPanel,
    AvailableResources,
} from "../components/Resources";

import axios from "axios";

const useSubgroups = (group: string) => {
    const [subgroups, setSubgroups] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        if (group !== "") {
            axios
                .post<{ subgroups: string[] }>("/api/file/subgroup", { group })
                .then(({ data }) => {
                    setSubgroups(data.subgroups);
                })
                .finally(() => setLoading(false));
        } else {
            setSubgroups([]);
            setLoading(false);
        }
        return () => {};
    }, [group]);

    return { subgroups, loading };
};

const useResources = (group?: string, subgroup?: string) => {
    const [resources, setResources] = useState<AvailableResources>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        setLoading(true);
        if (subgroup !== "") {
            axios
                .post<{ resources: AvailableResources }>(
                    "/api/file/resources",
                    {
                        group,
                        subgroup,
                    }
                )
                .then(({ data }) => {
                    setResources(data.resources);
                })
                .finally(() => setLoading(false));
        } else {
            setResources([]);
            setLoading(false);
        }

        return () => {};
    }, [group, subgroup]);

    return { resources, loading };
};

const Resources: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ groups }) => {
    const [selectedGroup, setSelectedGroup] = useState<string>("");
    const [selectedSubgroup, setSelectedSubgroup] = useState<string>("");
    const { subgroups, loading: sgLoading } = useSubgroups(selectedGroup);
    const { resources, loading: resLoading } = useResources(
        selectedGroup,
        selectedSubgroup
    );

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
                groups={groups}
                selectGroup={selectGroup}
                currentSelected={selectedGroup}
            />
            <SubGroupsPanel
                isLoading={sgLoading}
                subgroups={subgroups}
                selectSubgroup={selectSubgroup}
                currentSubGroup={selectedSubgroup}
                currentGroup={selectedGroup}
            />
            <ResourcesPanel
                resources={resources}
                isLoading={resLoading}
                currentSubGroup={selectedSubgroup}
            />
        </Flex>
    );
};

export const getServerSideProps: GetServerSideProps<{
    groups: string[];
}> = async (context: GetServerSidePropsContext) => {
    let groups = await prisma.resource.findMany({
        distinct: ["group"],
        select: {
            group: true,
        },
    });
    return {
        props: {
            groups: groups.map(({ group }) => group),
        },
    };
};

export default Resources;
