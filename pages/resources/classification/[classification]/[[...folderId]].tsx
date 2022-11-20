import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";

import { PageWithLayout } from "pages/_app";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";
import Layout from "@components/Layout";
import { FileClassification } from "@util/Enums";
import { Classifications } from "@util/helper";

import {
    Flex,
    Box,
    Center,
    useToken,
    HStack,
    IconButton,
    Button,
    Text,
    CircularProgress,
} from "@chakra-ui/react";
import SearchBar from "@components/SearchBar";
import { FormEvent, useEffect, useState } from "react";
import Pill from "@components/Resources/Pill";
import { useRouter } from "next/router";
import { Folder, IFolderSchema, IResourceSchema } from "@db/models";
import TabButton from "@components/Accounts/TabButton";
import { useData } from "@util/hooks/useData";
import { connectDB } from "@db/index";
import dynamic from "next/dynamic";
import { BsGridFill, BsListUl } from "react-icons/bs";
import { FaFolderOpen } from "react-icons/fa";
import ListView from "@components/Resources/ListView";
import GridView from "@components/Resources/GridView";

export type ResourceItemType = IResourceSchema & {
    id: string;
    uploadedBy?: { id: string; firstName: string; lastName: string };
    memberSchool?: { id: string; name: string };
};

export type FolderType = IFolderSchema & { id: string; root: string };

const DisplayFolders = dynamic(
    () => import("@components/Resources/DisplayFolders")
);
const DisplayResources = dynamic(
    () => import("@components/Resources/DisplayResources")
);

const FolderPage: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ classification, current, query: q }) => {
    const [mode, setMode] = useState<"folders" | "resources">("folders");
    const [view, setView] = useState<"list" | "grid">("list");

    const {
        data: folders,
        isLoading: foldersLoading,
        refetch: refetchFolders,
        clear: clearFolders,
    } = useData<FolderType[]>(`/api/resource/folders/${current?.id}/folders`);

    const {
        data: resources,
        isLoading: resourcesLoading,
        refetch: refetchResources,
        clear: clearResources,
    } = useData<ResourceItemType[]>(
        `/api/resource/folders/${current?.id}/resources`
    );

    const pageTitle =
        Classifications[classification as keyof typeof Classifications];

    const [query, setQuery] = useState<string>(q || "");

    const [primary, neutralizerLight, neutralizerDark] = useToken("colors", [
        "primary",
        "neutralizerLight",
        "neutralizerDark",
    ]);

    const router = useRouter();

    const changeClassification = (c: FileClassification | undefined) => {
        if (c) {
            router.push(
                `/resources/classification/${encodeURIComponent(
                    c.toLowerCase()
                )}`
            );
        }
    };

    const search = (e: FormEvent) => {
        e.preventDefault();
        if (query) {
            router.push(`/resources/search?q=${query}`);
        }
    };

    useEffect(() => {
        setMode("folders");
        refetchFolders();
        refetchResources();
    }, [current]);

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <Box h={"93vh"} overflow={"hidden"}>
                <Center
                    p={"4"}
                    pt={"8"}
                    pb={"4"}
                    bg={`${primary}EE`}
                    flexDir={"column"}
                    h={{ base: "20vh", md: "13vh" }}
                >
                    <SearchBar
                        placeholder={"Search For Resources"}
                        query={query}
                        setQuery={setQuery}
                        onSearch={search}
                    />
                    <Flex
                        w={"full"}
                        flexDir={{ base: "column", md: "row" }}
                        justify={{ base: "center", md: "space-between" }}
                        align={"center"}
                        py={{ base: "4", md: "0" }}
                    >
                        <Center mr={"4"} alignSelf={"stretch"}>
                            <Pill
                                name={pageTitle}
                                isActive={true}
                                onClick={() =>
                                    changeClassification(classification)
                                }
                            />
                        </Center>
                        <HStack
                            flex={"1"}
                            w={{ base: "full", md: "90%" }}
                            mt={"4"}
                            px={"4"}
                            overflow={"auto"}
                            css={{
                                "&::-webkit-scrollbar": {
                                    height: "1rem",
                                },
                                "&::-webkit-scrollbar-track": {
                                    height: "0.5rem",
                                },
                                "&::-webkit-scrollbar-thumb": {
                                    border: `5px solid rgba(0,0,0,0)`,
                                    "background-clip": "padding-box",
                                    borderRadius: "2rem",
                                    "background-color": `${neutralizerLight}66`,
                                },
                            }}
                        >
                            {Object.keys(Classifications).map((c) => {
                                const name =
                                    Classifications[
                                        c as keyof typeof Classifications
                                    ];
                                if (c === classification) return;
                                return (
                                    <Pill
                                        key={c}
                                        name={name}
                                        isActive={c === classification}
                                        onClick={() =>
                                            changeClassification(
                                                c as FileClassification
                                            )
                                        }
                                    />
                                );
                            })}
                        </HStack>
                    </Flex>
                </Center>
                <Flex
                    p={"4"}
                    justify={"space-between"}
                    align={"start"}
                    h={"8vh"}
                >
                    <Flex
                        flexDir={"column"}
                        justify={current && current.root ? "flex-start" : "flex-end"}
                        h={current && current.root ? "initial" : "full"}
                        align={"start"}
                    >
                        {current && current.root !== undefined && (
                            <Button
                                w={"fit-content"}
                                onClick={() =>
                                    router.push(
                                        `/resources/classification/${encodeURIComponent(
                                            classification?.toLowerCase() as string
                                        )}/${current.root.id}`
                                    )
                                }
                            >
                                <Box as={FaFolderOpen} mr={"2"} />
                                Return
                            </Button>
                        )}
                        <Text>
                            {current &&
                                current.fullPath &&
                                (() => {
                                    let path = current.fullPath
                                        .substring(1)
                                        .split("/");
                                    if (path.length > 3) {
                                        return `/${path[0]}/.../${path
                                            .splice(path.length - 2)
                                            .join("/")}`;
                                    }
                                    return current.fullPath;
                                })()}
                        </Text>
                    </Flex>
                    <Flex>
                        <IconButton
                            icon={<BsGridFill />}
                            aria-label={"grid"}
                            w={"fit-content"}
                            rounded={"0"}
                            roundedLeft={"md"}
                            borderColor={"primary"}
                            color={
                                view === "grid"
                                    ? "neutralizerLight"
                                    : "neutralizerDark"
                            }
                            bg={view === "grid" ? "primary" : "transparent"}
                            onClick={() => setView("grid")}
                        />
                        <IconButton
                            icon={<BsListUl />}
                            aria-label={"list"}
                            w={"fit-content"}
                            rounded={"0"}
                            roundedRight={"md"}
                            borderColor={"primary"}
                            color={
                                view === "list"
                                    ? "neutralizerLight"
                                    : "neutralizerDark"
                            }
                            bg={view === "list" ? "primary" : "transparent"}
                            onClick={() => setView("list")}
                        />
                    </Flex>
                </Flex>
                <Box px={"4"} fontSize={"sm"}></Box>
                <Flex
                    justify={"flex-start"}
                    align={"stretch"}
                    columnGap={"4"}
                    px={{ base: "2", md: "8" }}
                    py={"4"}
                    w={"full"}
                    h={{ base: "calc(65vh - 1rem)", md: "calc(72vh - 1rem)" }}
                    overflow={"auto"}
                    overflowX={"hidden"}
                    css={{
                        "&::-webkit-scrollbar": {
                            width: "1rem",
                        },
                        "&::-webkit-scrollbar-track": {
                            width: "0.5rem",
                        },
                        "&::-webkit-scrollbar-thumb": {
                            border: `5px solid rgba(0,0,0,0)`,
                            backgroundClip: "padding-box",
                            borderRadius: "2rem",
                            backgroundColor: `${neutralizerDark}66`,
                        },
                    }}
                >
                    {(() => {
                        if (resourcesLoading || foldersLoading) {
                            return (
                                <Center w={"full"}>
                                    <CircularProgress
                                        isIndeterminate
                                        color={"secondary"}
                                        size={8}
                                    />
                                </Center>
                            );
                        } else {
                            if (view === "grid") {
                                return (
                                    <GridView>
                                        <DisplayFolders
                                            folders={folders}
                                            view={view}
                                            loading={foldersLoading}
                                            reload={refetchFolders}
                                            classification={
                                                classification as FileClassification
                                            }
                                        />
                                        <DisplayResources
                                            resources={resources}
                                            view={view}
                                            loading={resourcesLoading}
                                            refetchResources={refetchResources}
                                        />
                                    </GridView>
                                );
                            } else {
                                return (
                                    <ListView>
                                        <DisplayFolders
                                            folders={folders}
                                            view={view}
                                            loading={foldersLoading}
                                            reload={refetchFolders}
                                            classification={
                                                classification as FileClassification
                                            }
                                        />
                                        <DisplayResources
                                            resources={resources}
                                            view={view}
                                            loading={resourcesLoading}
                                            refetchResources={refetchResources}
                                        />
                                    </ListView>
                                );
                            }
                        }
                    })()}
                </Flex>
            </Box>
        </>
    );
};

export const getServerSideProps: GetServerSideProps<{
    classification?: FileClassification;
    current?: IFolderSchema & { id: string };
    query?: string;
}> = AuthGetServerSideProps(
    async ({ params }: GetServerSidePropsContextWithUser) => {
        await connectDB();
        let c: FileClassification | undefined = undefined;

        if (params?.classification) {
            const tempClassification = params.classification as string;
            if (
                Object.values(FileClassification).includes(
                    tempClassification.toUpperCase() as unknown as FileClassification
                )
            ) {
                c =
                    FileClassification[
                        tempClassification.toUpperCase() as keyof typeof FileClassification
                    ];

                const rootFolder = params.folderId
                    ? await Folder.findById(params.folderId).populate(
                          "root",
                          "id"
                      )
                    : await Folder.findOne({
                          name: Classifications[c],
                          root: undefined,
                      });

                if (c) {
                    const props: { [key: string]: any } = {
                        classification: c,
                        current: rootFolder?.toJSON(),
                    };
                    if (params?.q) props["query"] = params.q;

                    return { props };
                }
            }
        }
        return {
            notFound: true,
        };
    },
    [],
    true
);

FolderPage.PageLayout = Layout;

export default FolderPage;
