import {
    NextPage,
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
} from "next";

import type { UserRegistration } from "@prisma/client";
import { prisma } from "prisma/db";

import { Box } from "@chakra-ui/react";
import { ParsedUrlQuery } from "querystring";

const RegistrationsPage: NextPage<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ registrations }) => {
    return <Box></Box>;
};

interface QueryParams extends ParsedUrlQuery {
    uid: string;
}

export const getServerSideProps: GetServerSideProps<
    {
        registrations: UserRegistration[];
    },
    QueryParams
> = async (context) => {
    const { uid } = context.params!;

    const registrations = await prisma.userRegistration.findMany({
        where: {
            memberSchoolId: "1",
        },
    });

    return {
        props: {
            registrations,
        },
    };
};

export default RegistrationsPage;
