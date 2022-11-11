import { useState, FormEvent, useMemo, useEffect } from "react";

import Layout from "@components/Layout";
import { PageWithLayout } from "../_app";

import {
    Box,
    Text,
    Center,
    useToken,
    Grid,
    useDisclosure,
} from "@chakra-ui/react";

import SearchBar from "@components/SearchBar";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { connectDB, IResourceSchema, Resource, User } from "@db/index";
import {
    AccountType,
    FileAccessibility,
    FileClassification,
    FileType,
    ResourceStatus,
} from "@util/Enums";
import { useRouter } from "next/router";
import ResourceItem from "@components/Resources/ResourceItem";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const EditResourceModal = dynamic(
    () => import("@components/Resources/EditResourceModal")
);

const SearchResource: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ data }) => {
    const [query, setQuery] = useState<string>(data?.query || "");
    const [primary] = useToken("colors", ["primary"]);
    const router = useRouter();

    const [selected, setSelected] = useState<
        | (IResourceSchema & {
              id: string;
              folder: string;
              uploadedBy: string;
          })
        | undefined
    >(undefined);

    const { isOpen, onOpen, onClose } = useDisclosure();

    const search = (e: FormEvent) => {
        e.preventDefault();
        router.push(`/resources/search/?q=${query}`);
    };

    const manageResource = (
        resource: IResourceSchema & {
            id: string;
            folder: string;
            uploadedBy: string;
        }
    ) => {
        setSelected(resource);
        onOpen();
    };

    return (
        <>
            <Head>
                <title>CORE</title>
            </Head>
            <Box>
                <Center
                    p={"4"}
                    flexDir={"column"}
                    position={"relative"}
                    w={"full"}
                    bg={`${primary}EE`}
                >
                    <SearchBar {...{ query, setQuery, onSearch: search }} />
                </Center>
                {data?.resources ? (
                    <Grid
                        w={"full"}
                        h={"fit-content"}
                        gridTemplateColumns={{
                            base: "repeat(2, 1fr)",
                            md: "repeat(3, 1fr)",
                            xl: "repeat(4, 1fr)",
                        }}
                        justifyItems={"center"}
                        alignItems={"start"}
                        gap={"4"}
                        mt={"4"}
                    >
                        {data.resources.map((resource) => (
                            <ResourceItem
                                resource={resource}
                                reload={() => router.reload()}
                                onManage={manageResource}
                            />
                        ))}
                    </Grid>
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
            </Box>
            <AnimatePresence>
                {isOpen && selected && (
                    <EditResourceModal
                        resource={selected}
                        onDismiss={() => onClose()}
                        refetch={() => router.reload()}
                    />
                )}
            </AnimatePresence>
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
    folder: string;
}

export const getServerSideProps: GetServerSideProps<{
    data?: {
        resources?: (IResourceSchema & {
            id: string;
            folder: string;
            uploadedBy: string;
        })[];
        query?: string;
    };
}> = AuthGetServerSideProps(
    async ({ query, uid }: GetServerSidePropsContextWithUser) => {
        let q: string | undefined;

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
        const status: ResourceStatus[] = [ResourceStatus.APPROVED];

        if (user) {
            switch (user.accountType) {
                case AccountType.CEAP_SUPER_ADMIN:
                case AccountType.CEAP_ADMIN:
                    accessibility.push(FileAccessibility.HIDDEN);
                    status.push(ResourceStatus.ARCHIVED);
                default:
                    accessibility.push(FileAccessibility.PRIVATE);
            }
        }

        if (q) {
            const resources = await Resource.find({
                filename: { $regex: `.*${q}.*`, $options: "i" },
                status,
                accessibility,
                classification: query.c || Object.keys(FileClassification),
            })
                .select(
                    "id filename classification fileType accessibility size status uploadedBy folder"
                )
                .limit(15);

            return {
                props: {
                    data: {
                        resources: resources.map((resource) => ({
                            ...resource.toJSON(),
                            uploadedBy: resource.uploadedBy?.toHexString(),
                            folder: resource.folder?.toHexString(),
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
