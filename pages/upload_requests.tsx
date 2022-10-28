import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import NextHead from "next/head";

import { PageWithLayout } from "./_app";

import {
    Center,
    CircularProgress,
    Table,
    TableContainer,
    Tbody,
    Td,
    Thead,
    Tr,
} from "@chakra-ui/react";

import TopPanel from "@components/TopPanel";

import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";
import Layout from "@components/Layout";

import TableHeader from "@components/TableHeader";
import { useData } from "@util/hooks/useData";
import ResourceData from "@components/Uploads/ResourceData";

import { Resource, connectDB } from "@db/index";

import { AccountType, RequestStatus, FileType } from "@util/Enums";

const UploadRequests: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ uploads }) => {
    const { data, isLoading } = useData("", uploads);

    return (
        <>
            <NextHead>
                <title>Uploads</title>
            </NextHead>
            <TopPanel title={"Upload Requests"} />
            <TableContainer maxH={"inherit"} overflowY={"auto"}>
                <Table>
                    <Thead bg={"gray.100"} position={"sticky"} top={"0"}>
                        <Tr>
                            <TableHeader heading={"Date Uploaded"} sortable />
                            <TableHeader heading={"File Name"} />
                            <TableHeader heading={"file type"} />
                            <TableHeader heading={"uploader"} />
                            <TableHeader heading="" />
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data?.map((resource) => (
                            <ResourceData
                                key={resource.id}
                                resource={resource}
                            />
                        ))}
                        {isLoading && (
                            <Tr>
                                <Td colSpan={5}>
                                    <Center h={"full"} w={"full"}>
                                        <CircularProgress
                                            isIndeterminate
                                            color={"secondary"}
                                        />
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

export interface UploadContentData {
    id: string;
    filename: string;
    fileType: FileType | null;
    contentType: string;
    dateAdded: string;
    uploadedBy: {
        id: string;
        displayName: string | null;
    } | null;
}

export const getServerSideProps: GetServerSideProps<{
    uploads?: UploadContentData[];
}> = AuthGetServerSideProps(
    async (ctx: GetServerSidePropsContextWithUser) => {
        await connectDB();

        const uploads = await Resource.find({
            status: {
                $in: [
                    RequestStatus.FOR_ADMIN_REVIEW,
                    RequestStatus.FOR_CEAP_REVIEW,
                ],
            },
        });

        console.log(uploads);

        return {
            props: {
                uploads: uploads.map((resources) => ({
                    ...resources.toJSON(),
                    dateAdded: resources.dateAdded.toDateString(),
                })),
            },
        };
    },
    [AccountType.CEAP_ADMIN, AccountType.CEAP_SUPER_ADMIN]
);

UploadRequests.PageLayout = Layout;

export default UploadRequests;
