import { useEffect, useState } from "react";

import {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
    NextPage,
} from "next";

import { prisma } from "../prisma/db";

const Resources: NextPage = () => {
    return <></>;
};

// export const getServerSideProps: GetServerSideProps<{
//     data: string[];
// }> = async (context: GetServerSidePropsContext) => {
//     return {
//         props: {
//             data: [],
//         },
//     };
// };

export default Resources;
