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
    Text,
    VStack,
    CircularProgress,
    Grid,
    useBreakpoint,
} from "@chakra-ui/react";
import SearchBar from "@components/SearchBar";
import { useEffect, useState } from "react";
import Pill from "@components/Resources/Pill";
import { useRouter } from "next/router";
import { Folder, IFolderSchema, IResourceSchema } from "@db/models";
import TabButton from "@components/Accounts/TabButton";
import { useData } from "@util/hooks/useData";
import { connectDB } from "@db/index";
import ResourceItem from "@components/Resources/ResourceItem";
import FolderItem from "@components/Resources/FolderItem";

type ResourceOrFolder = (
    | (IResourceSchema & { uploadedBy: string })
    | (IFolderSchema & { root: string })
) & { id: string };

const FolderPage: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ classification, current, query: q }) => {
    const [mode, setMode] = useState<"folders" | "resources">("folders");

    const { data, isLoading, refetch, clear } = useData<ResourceOrFolder[]>(
        `/api/resource/folders/${current?.id}${q ? "?q=" + q : ""}`
    );

    const pageTitle =
        Classifications[classification as keyof typeof Classifications];

    const [query, setQuery] = useState<string>(q || "");

    const [primary, secondary, neutralizerLight, neutralizerDark] = useToken(
        "colors",
        ["primary", "secondary", "neutralizerLight", "neutralizerDark"]
    );

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

    useEffect(() => {
        setMode("folders");
        refetch();
    }, [current]);

    const navigateFolder = (folderId: string) => {
        router.push(
            `/resources/classification/${encodeURIComponent(
                classification?.toLowerCase() as string
            )}/${folderId}`
        );
    };

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
                        query={query}
                        setQuery={setQuery}
                        onSearch={() => {}}
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
                            w={"90%"}
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
                <HStack p={"4"} justify={"flex-start"} h={"8vh"}>
                    <TabButton
                        onClick={() => {
                            if (!isLoading) {
                                setMode("folders");
                                clear();
                                refetch();
                            }
                        }}
                        isActive={mode === "folders"}
                    >
                        Folders
                    </TabButton>

                    <TabButton
                        onClick={() => {
                            if (!isLoading) {
                                setMode("resources");
                                clear();
                                refetch(
                                    `/api/resource/folders/${current?.id}/resources${q ? "?q=" + q : ""}`
                                );
                            }
                        }}
                        isActive={mode === "resources"}
                    >
                        Resources
                    </TabButton>
                </HStack>
                <Flex
                    justify={"flex-start"}
                    align={"stretch"}
                    px={"8"}
                    py={"4"}
                    w={"full"}
                    h={{ base: "65vh", md: "72vh" }}
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
                    >
                        {(() => {
                            if (data && !isLoading) {
                                if (data.length > 0) {
                                    if ("blobPath" in data[0]) {
                                        return (
                                            <>
                                                {data.map((d) => (
                                                    <ResourceItem
                                                        resource={d}
                                                    />
                                                ))}
                                            </>
                                        );
                                    } else {
                                        return (
                                            <>
                                                {data.map((f) => (
                                                    <FolderItem
                                                        folder={f}
                                                        onClick={() =>
                                                            navigateFolder(f.id)
                                                        }
                                                    />
                                                ))}
                                            </>
                                        );
                                    }
                                } else {
                                    return (
                                        <Text gridColumn={"1 / 5"}>
                                            There are currently no {mode}{" "}
                                            available.
                                        </Text>
                                    );
                                }
                            } else {
                                if (isLoading) {
                                    return (
                                        <Center
                                            w={"full"}
                                            placeSelf={"center"}
                                            gridColumn={"1/6"}
                                        >
                                            <CircularProgress
                                                isIndeterminate
                                                color={"secondary"}
                                                size={12}
                                            />
                                        </Center>
                                    );
                                } else {
                                    return (
                                        <Text>
                                            There are currently no {mode}{" "}
                                            available.
                                        </Text>
                                    );
                                }
                            }
                        })()}
                    </Grid>
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
