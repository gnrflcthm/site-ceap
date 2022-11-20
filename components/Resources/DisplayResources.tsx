import {
    Center,
    CircularProgress,
    useDisclosure,
} from "@chakra-ui/react";
import { IResourceSchema } from "@db/models";
import { AnimatePresence } from "framer-motion";
import { ResourceItemType } from "pages/resources/classification/[classification]/[[...folderId]]";
import { FC, useState } from "react";
import EditResourceModal from "./EditResourceModal";
import GridResourceItem from "./GridResourceItem";
import GridView from "./GridView";import ListResourceItem from "./ListResourceItem";
import ResourceInfoModal from "./ResourceInfoModal";

const DisplayResources: FC<{
    resources: ResourceItemType[] | undefined;
    view: "list" | "grid";
    loading: boolean;
    refetchResources: Function;
}> = ({ resources, view, loading = true, refetchResources = () => {} }) => {
    const [currentResource, setCurrentResource] = useState<
        ResourceItemType | undefined
    >(undefined);

    const {
        isOpen: showEditModal,
        onOpen: openEditModal,
        onClose: closeEditModal,
    } = useDisclosure();

    const {
        isOpen: showResource,
        onOpen: openResource,
        onClose: closeResource,
    } = useDisclosure();

    const manageResource = (resource: ResourceItemType) => {
        setCurrentResource(resource);
        openEditModal();
    };

    const viewResource = (resource: ResourceItemType) => {
        setCurrentResource(resource);
        openResource();
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

    if (!resources || resources?.length < 1) {
        return (
            // <Center w={"full"}>
            //     <Text>There are currently no resources to display.</Text>
            // </Center>
            <></>
        );
    }

    if (view === "list") {
        return (
            <>
                {resources?.map((resource) => (
                    <ListResourceItem
                        resource={resource}
                        onManage={manageResource}
                        reload={() => refetchResources()}
                        onView={viewResource}
                    />
                ))}
                <AnimatePresence>
                    {showEditModal && currentResource && (
                        <EditResourceModal
                            resource={
                                currentResource as IResourceSchema & {
                                    id: string;
                                    folder?: string | undefined;
                                }
                            }
                            onDismiss={() => closeEditModal()}
                            refetch={() => refetchResources()}
                        />
                    )}
                    {showResource && currentResource && (
                        <ResourceInfoModal
                            resourceId={currentResource.id}
                            onDismiss={() => closeResource()}
                        />
                    )}
                </AnimatePresence>
            </>
        );
    } else {
        return (
            <>
                {resources?.map((resource) => (
                    <GridResourceItem
                        resource={resource}
                        onManage={manageResource}
                        reload={() => refetchResources()}
                        onView={viewResource}
                    />
                ))}
                <AnimatePresence>
                    {showEditModal && currentResource && (
                        <EditResourceModal
                            resource={
                                currentResource as IResourceSchema & {
                                    id: string;
                                    folder?: string | undefined;
                                }
                            }
                            onDismiss={() => closeEditModal()}
                            refetch={() => refetchResources()}
                        />
                    )}
                    {showResource && currentResource && (
                        <ResourceInfoModal
                            resourceId={currentResource.id}
                            onDismiss={() => closeResource()}
                        />
                    )}
                </AnimatePresence>
            </>
        );
    }
};

export default DisplayResources;
