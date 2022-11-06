import { useState, FormEvent, useMemo, useEffect } from "react";

import Layout from "@components/Layout";
import { PageWithLayout } from "../_app";

import {
    Box,
    Flex,
    Text,
    Image,
    VStack,
    HStack,
    Center,
} from "@chakra-ui/react";

import landingBg from "@assets/aboutimghd.jpg";
import coreNavLogo from "@assets/CORE_Nav.png";

import SearchBar from "@components/SearchBar";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { connectDB, Resource, User } from "@db/index";
import {
    FileAccessibility,
    FileClassification,
    FileType,
    RequestStatus,
} from "@util/Enums";
import { useRouter } from "next/router";
import ResourceItem from "@components/Resources/ResourceItem";
import Pill from "@components/Resources/Pill";
import { getFileClassification } from "@util/helper";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";

const SearchResource: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
    const [query, setQuery] = useState<string>(data?.query || "");

    const [categoryFilter, setCategoryFilter] = useState<
        FileClassification | "All"
    >("All");

    const filteredResources = useMemo<ClientResourceType[] | undefined>(() => {
        if (data?.resources) {
            if (categoryFilter === "All") {
                return data.resources;
            } else {
                return data.resources.filter(
                    (resource) => resource.classification === categoryFilter
                );
            }
        }
        return undefined;
    }, [data?.resources, categoryFilter]);

    const router = useRouter();

    const search = (e: FormEvent) => {
        e.preventDefault();
        router.push(`/resources/search/?q=${query}`);
    };

    const classifications = useMemo<(FileClassification | "All")[]>(() => {
        let classifications: (FileClassification | "All")[] = ["All"];
        if (data?.resources) {
            data.resources
                .map((resource) => resource.classification)
                .forEach((classification, index, arr) => {
                    if (arr.indexOf(classification) === index)
                        classifications.push(classification);
                });
        }
        return classifications;
    }, [data?.resources]);

    useEffect(() => {
        if (data?.resources) {
            setCategoryFilter("All");
        } else {
        }
    }, [data]);

    return (
        <>
            <Head>
                <title>CORE</title>
            </Head>
            <Flex
                position={"relative"}
                flexDir={"column"}
                w={"full"}
                h={"93vh"}
                maxH={"93vh"}
                flex={"1"}
                overflow={"auto"}
                overflowX={"hidden"}
                bg={`linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${landingBg.src})`}
                bgPos={"center"}
                bgSize={"cover"}
                backdropBlur={"sm"}
                py={"20"}
            >
                <Flex
                    w={"full"}
                    justify={"center"}
                    align={"center"}
                    position={"relative"}
                >
                    <VStack
                        justify={"center"}
                        align={"center"}
                        spacing={"4"}
                        position={"relative"}
                        mb={"10"}
                        px={"10"}
                        w={"full"}
                    >
                        <Image src={coreNavLogo.src} w={"96"} />
                        <Box w={{ base: "full", lg: "50%" }}>
                            <SearchBar
                                {...{ query, setQuery, onSearch: search }}
                            />
                        </Box>
                        {data?.resources && data?.resources?.length > 0 && (
                            <HStack w={"50%"}>
                                {classifications.map((classification) => (
                                    <Pill
                                        key={classification}
                                        name={
                                            classification === "All"
                                                ? "All"
                                                : getFileClassification(
                                                      classification
                                                  )
                                        }
                                        onClick={() =>
                                            setCategoryFilter(classification)
                                        }
                                        isActive={
                                            categoryFilter === classification
                                        }
                                    />
                                ))}
                            </HStack>
                        )}
                    </VStack>
                </Flex>
                {filteredResources && filteredResources?.length > 0 ? (
                    <VStack>
                        {filteredResources.map((resource) => (
                            <ResourceItem resource={resource} />
                        ))}
                    </VStack>
                ) : (
                    <Center minH={"20vh"}>
                        <Text
                            color={"neutralizerLight"}
                            fontWeight={"bold"}
                            fontSize={"2xl"}
                        >
                            No Resources Found
                        </Text>
                    </Center>
                )}
            </Flex>
        </>
    );
};

export interface ClientResourceType {
    id: string;
    filename: string;
    classification: FileClassification;
    fileType: FileType;
    size: number;
    uploadedBy: string | undefined;
}

export const getServerSideProps: GetServerSideProps<{
    data?: { resources?: ClientResourceType[]; query?: string };
}> = AuthGetServerSideProps(
    async ({ query, uid }: GetServerSidePropsContextWithUser) => {
        let q: string | undefined;
        let p: number | undefined = undefined;

        if (query.p && typeof query.p === "string") {
            if (!isNaN(parseInt(query.p))) {
                p = parseInt(query.p);
            }
        }

        if (query.q) {
            if (Array.isArray(query.q)) {
                q = query.q[0];
            } else {
                q = query.q;
            }
        }

        await connectDB();

        const user = await User.findOne({ authId: uid });

        const accessibility: FileAccessibility[] = [FileAccessibility.PUBLIC];
        if (user) {
            accessibility.push(FileAccessibility.PRIVATE);
        }

        if (q) {
            const resources = await Resource.find({
                filename: { $regex: `.*${q}.*`, $options: "i" },
                status: RequestStatus.APPROVED,
                accessibility,
            })
                .select("id filename classification fileType size uploadedBy")
                .skip(p ? 15 * p : 0)
                .limit(15);

            return {
                props: {
                    data: {
                        resources: resources.map((resource) => ({
                            ...resource.toJSON(),
                            uploadedBy: resource.uploadedBy?.toHexString(),
                        })),
                        query: q,
                    },
                },
            };
        } else {
            return {
                redirect: {
                    destination: "/",
                    statusCode: 301,
                },
            };
        }
    },
    [],
    true
);

SearchResource.PageLayout = Layout;

export default SearchResource;
