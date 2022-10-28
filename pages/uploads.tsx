import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

import { PageWithLayout } from "./_app";

import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";

import Layout from "@components/Layout";
import TopPanel from "@components/TopPanel";

import { useDisclosure } from "@chakra-ui/react";
import { AnimatePresence } from "framer-motion";

import { Resource, connectDB, IResourceSchema } from "@db/index";

import { FileType, AccountType } from "@util/Enums";

const RequestUploadModal = dynamic(
    () => import("@components/Uploads/RequestUploadModal")
);

const Uploads: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = () => {
    const {
        isOpen: showUploadModal,
        onClose: closeUploadModal,
        onOpen: openUploadModal,
    } = useDisclosure();

    return (
        <>
            <Head>
                <title>My Uploads</title>
            </Head>
            <TopPanel title={"My Uploads"} />
            <button onClick={() => openUploadModal()}>show</button>
            <AnimatePresence>
                {showUploadModal && (
                    <RequestUploadModal close={() => closeUploadModal()} />
                )}
            </AnimatePresence>
        </>
    );
};

export interface UploadData {
    id: string;
    filename: string;
    fileType: FileType | null;
    contentType: string;
    dateAdded: string;
}

export const getServerSideProps: GetServerSideProps<{
    uploads?: IResourceSchema[];
}> = AuthGetServerSideProps(
    async (ctx: GetServerSidePropsContextWithUser) => {
        const { uid } = ctx;

        await connectDB();

        const uploads = await Resource.find({
            uploadedBy: { authId: uid },
        });

        return {
            props: {
                uploads: uploads.map((resources) => ({
                    ...resources,
                    dateAdded: resources.dateAdded.toDateString(),
                })),
            },
        };
    },
    [AccountType.MS_ADMIN]
);

Uploads.PageLayout = Layout;

export default Uploads;
