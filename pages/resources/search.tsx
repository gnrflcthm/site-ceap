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
    CircularProgress,
    IconButton,
    HStack,
    Button,
} from "@chakra-ui/react";

import SearchBar from "@components/SearchBar";
import Head from "next/head";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import {
    connectDB,
    IMemberSchoolSchema,
    IResourceSchema,
    IUserSchema,
    Resource,
    User,
} from "@db/index";
import {
    AccountType,
    FileAccessibility,
    FileClassification,
    FileType,
    ResourceStatus,
} from "@util/Enums";
import { useRouter } from "next/router";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";
import { AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import ListView from "@components/Resources/ListView";
import { ResourceItemType } from "./classification/[classification]/[[...folderId]]";
import ListResourceItem from "@components/Resources/ListResourceItem";
import DisplayResources from "@components/Resources/DisplayResources";
import { Document } from "mongoose";
import { useData } from "@util/hooks/useData";
import { FaCaretLeft } from "react-icons/fa";

const EditResourceModal = dynamic(
    () => import("@components/Resources/EditResourceModal")
);

const SearchResource: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ q }) => {
    const [query, setQuery] = useState<string>(q || "");
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

    const {
        data: resources,
        isLoading,
        error,
        refetch,
    } = useData<ResourceItemType[]>(`/api/resource/a/search?q=${query}`);

    useEffect(() => {
        refetch();
    }, [q]);

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
                <HStack
                    p={"4"}
                    position={"relative"}
                    w={"full"}
                    bg={`${primary}EE`}
                >
                    <Button aria-label={"Return"} variant={"transparent"} leftIcon={<FaCaretLeft />} onClick={() => router.push("/")}>
                        <Text color={"neutralizerLight"}>Back</Text>
                    </Button>
                    <SearchBar
                        {...{
                            query,
                            setQuery,
                            onSearch: search,
                            placeholder: "Search For Resources",
                        }}
                    />
                </HStack>
                {resources && resources.length > 0 ? (
                    <Box p={"4"}>
                        <DisplayResources
                            resources={resources}
                            loading={false}
                            view={"list"}
                            refetchResources={() => {}}
                        />
                    </Box>
                ) : (
                    <Center minH={"20vh"}>
                        {isLoading ? (
                            <CircularProgress
                                isIndeterminate
                                size={8}
                                color={"secondary"}
                            />
                        ) : (
                            <Text fontSize={"xl"}>No Resources Found</Text>
                        )}
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
    q?: string;
}> = AuthGetServerSideProps(
    async ({ query }: GetServerSidePropsContextWithUser) => {
        let q: string | undefined;

        if (query.q) {
            if (Array.isArray(query.q)) {
                q = query.q[0];
            } else {
                q = query.q;
            }
        }
        if (q) {
            return {
                props: {
                    q,
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
