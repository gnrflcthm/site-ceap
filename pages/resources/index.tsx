import { useEffect, useState } from "react";

import {
    GetServerSideProps,
    GetServerSidePropsContext,
    InferGetServerSidePropsType,
    NextPage,
} from "next";

import coreLogo from "../../assets/CORE_logo.jpg";

import { Box, Flex, VStack, Text } from "@chakra-ui/react";

import { prisma } from "../../prisma/db";

import Image, { StaticImageData } from "next/image";

import { ResourceClassification } from "../../components/Resources";

const Resources: NextPage = () => {
    return (
        <VStack align={"stretch"} bg={"secondary"} spacing={"0"}>
            <Flex
                justify={"center"}
                align={"center"}
                minH={"50vh"}
                bg={"secondary"}
            >
                <Box position={"relative"} objectFit={"cover"} p={"40"}>
                    <Image
                        src={coreLogo}
                        layout={"fill"}
                        objectFit={"contain"}
                    />
                </Box>
            </Flex>
            <Flex
                justify={"space-between"}
                align={"center"}
                p={"10"}
                flexWrap={"wrap"}
                bg={"primary"}
            >
                <ResourceClassification
                    classification={"Basic Education"}
                />
                <ResourceClassification
                    classification={"Basic Education"}
                />
                <ResourceClassification
                    classification={"Basic Education"}
                />
                <ResourceClassification
                    classification={"Basic Education"}
                />
                <ResourceClassification
                    classification={"Basic Education"}
                />
                <ResourceClassification
                    classification={"Basic Education"}
                />
                <ResourceClassification
                    classification={"Basic Education"}
                />
                <ResourceClassification
                    classification={"Basic Education"}
                />
                <ResourceClassification
                    classification={"Basic Education"}
                />
                <ResourceClassification
                    classification={"Basic Education"}
                />
                <ResourceClassification
                    classification={"Basic Education"}
                />
                <ResourceClassification
                    classification={"Basic Education"}
                />
            </Flex>
        </VStack>
    );
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
