import { Center, CircularProgress, Text } from "@chakra-ui/react";
import { FileClassification } from "@util/Enums";
import { useRouter } from "next/router";
import { FolderType } from "pages/resources/classification/[classification]/[[...folderId]]";
import { FC } from "react";
import GridView from "./GridView";
import ListFolderItem from "./ListFolderItem";
import ListView from "./ListView";

const DisplayFolders: FC<{
    folders: FolderType[] | undefined;
    view: "list" | "grid";
    loading: boolean;
    reload: Function;
    classification: FileClassification
}> = ({ folders, view, loading = true, reload, classification }) => {

    const router = useRouter();


    const navigateFolder = (folderId: string) => {
        router.push(
            `/resources/classification/${encodeURIComponent(
                classification?.toLowerCase() as string
            )}/${folderId}`
        );
    };


    if (loading) {
        return (
            <Center w={"full"}>
                <CircularProgress
                    isIndeterminate
                    color={"secondary"}
                    size={8}
                />
            </Center>
        );
    }

    if (!folders || folders?.length < 1) {
        return (
            <Center w={"full"}>
                <Text>There are currently no folders to display.</Text>
            </Center>
        );
    }

    if (view === "list") {
        return (
            <ListView>
                {folders.map((folder) => (
                    <ListFolderItem folder={folder} navigateFolder={navigateFolder} />
                ))}
            </ListView>
        );
    } else {
        return (
            <GridView columnTemplate={"repeat(2, 1fr)"}>
                {folders.map((folder) => (
                    <ListFolderItem folder={folder} navigateFolder={navigateFolder} />
                ))}
            </GridView>
        );
    }
};

export default DisplayFolders;
