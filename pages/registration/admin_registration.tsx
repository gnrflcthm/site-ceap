import {
    GetServerSideProps,
    InferGetServerSidePropsType,
    NextPage,
} from "next";
import { Prisma } from "@prisma/client";
import { prisma } from "prisma/db";
import { Button, Flex } from "@chakra-ui/react";
import { useState } from "react";
import CoreSelect from "@components/CoreSelect";

const AdminRegistrationPage: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ memberSchools }) => {
    const [organization, setOrganization] = useState<string>("");
    return (
        <Flex p={"10"}>
            <CoreSelect
                // @ts-ignore
                options={memberSchools}
                placeholder={"School or Organization"}
                setValue={setOrganization}
                isGrouped
            />
        </Flex>
    );
};

export const getServerSideProps: GetServerSideProps<{
    memberSchools:
        | (Prisma.PickArray<
              Prisma.MemberSchoolGroupByOutputType,
              ("region" | "id" | "name" | "address")[]
          > & {})[];
}> = async () => {
    const memberSchools = await prisma.memberSchool.groupBy({
        by: ["region", "name", "id", "address"],
        where: {
            isRegistered: false,
        },
        orderBy: {
            region: "asc",
        },
    });
    return {
        props: {
            memberSchools,
        },
    };
};

export default AdminRegistrationPage;
