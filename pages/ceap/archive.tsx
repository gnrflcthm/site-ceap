import { PageWithLayout } from "pages/_app";
import Layout from "@components/Layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dynamic from "next/dynamic";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";
import Head from "next/head";
import TopPanel from "@components/TopPanel";
import {
    Text,
    Center,
    CircularProgress,
    Flex,
    Table,
    TableContainer,
    Tbody,
    Thead,
    Tr,
    Td,
} from "@chakra-ui/react";
import { AccountType, ResourceStatus } from "@util/Enums";
import { IResourceSchema, Resource } from "@db/models";
import { connectDB } from "@db/index";
import TableHeader from "@components/TableHeader";
import { useData } from "@util/hooks/useData";
import { FilterQuery } from "mongoose";
import SearchBar from "@components/SearchBar";
import { useState } from "react";
import { useRouter } from "next/router";

const ArchiveItem = dynamic(() => import("@components/Archive/ArchiveItem"));

const Archives: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ resources, q }) => {
    const { data, isLoading } = useData<ArchiveType[]>("", resources);
    const router = useRouter();

    const [query, setQuery] = useState<string>(q || "");

    const search = () => {
        router.push(`/ceap/archive?q=${query}`);
    };

    return (
        <>
            <Head>
                <title>Archived Resources</title>
            </Head>
            <TopPanel title={"Archived Resources"} />
            <Flex justify={"flex-end"} align={"center"} p={"4"}>
                <SearchBar
                    query={query}
                    setQuery={setQuery}
                    onSearch={() => search()}
                    inputColor={"neutralizerDark"}
                />
            </Flex>
            <TableContainer>
                <Table>
                    <Thead bg={"gray.100"} position={"sticky"} top={"0"}>
                        <Tr>
                            <TableHeader heading={"Date Uploaded"} sortable />
                            <TableHeader heading={"File Name"} />
                            <TableHeader heading={"file type"} />
                            <TableHeader heading={"uploaded by"} />
                            <TableHeader heading={""} />
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data && data.length > 0 ? (
                            data.map((resource) => (
                                <ArchiveItem
                                    key={resource.id}
                                    resource={resource}
                                />
                            ))
                        ) : (
                            <Tr>
                                <Td colSpan={4}>
                                    <Center>
                                        {isLoading ? (
                                            <CircularProgress
                                                isIndeterminate
                                                size={8}
                                                color={"secondary"}
                                            />
                                        ) : (
                                            <Text>No Resources Found.</Text>
                                        )}
                                    </Center>
                                </Td>
                            </Tr>
                        )}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    );
};

export type ArchiveType = IResourceSchema & {
    id: string;
    dateAdded: string;
    uploadedBy: {
        id: string;
        firstName: string;
        lastName: string;
        displayName?: string;
    };
    folder: string;
};

export const getServerSideProps: GetServerSideProps<{
    resources?: ArchiveType[];
    q?: string;
}> = AuthGetServerSideProps(
    async ({ req, query }: GetServerSidePropsContextWithUser) => {
        let q: string | undefined = undefined;
        let p: number | undefined = undefined;

        if (query.p && typeof query.p === "string") {
            try {
                p = parseInt(query.p) - 1;
                if (p < 1) {
                    return {
                        notFound: true,
                    };
                }
            } catch {
                return {
                    notFound: true,
                };
            }
        } else {
            p = 0;
        }

        if (query.q) {
            if (Array.isArray(query.q)) {
                q = query.q[0];
            } else {
                q = query.q;
            }
        }

        await connectDB();

        const tempQuery: FilterQuery<IResourceSchema> = {
            status: ResourceStatus.ARCHIVED,
        };

        if (q) {
            tempQuery["filename"] = { $regex: `.*${q}.*`, $options: "i" };
        }

        const resources = await Resource.find(tempQuery)
            .populate("uploadedBy", [
                "id",
                "firstName",
                "lastName",
                "displayName",
            ])
            .skip(p * 15)
            .limit(15);

        return {
            props: {
                resources: resources.map((resource) => ({
                    ...resource.toJSON(),
                    dateAdded: resource.dateAdded.toLocaleString(),
                    folder: resource.folder?.toHexString(),
                })),
                q: q || null,
            },
        };
    },
    [AccountType.CEAP_ADMIN, AccountType.CEAP_SUPER_ADMIN]
);

Archives.PageLayout = Layout;

export default Archives;
