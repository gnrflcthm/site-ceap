import { MenuItem, MenuList, useDisclosure, useToast } from "@chakra-ui/react";
import { IResourceSchema } from "@db/models";
import { FileAccessibility, ResourceStatus } from "@util/Enums";
import axios from "axios";
import { FC } from "react";

const CEAPMenuList: FC<{
    onDownload: Function;
    onManage: Function;
    resource: IResourceSchema & {
        id: string;
        uploadedBy: string;
        folder: string;
    };
    reload: Function;
}> = ({ onDownload, resource, reload = () => {}, onManage = () => {}}) => {
    const toast = useToast();

    const updateStatus = () => {
        const status =
            resource.status === ResourceStatus.APPROVED
                ? ResourceStatus.ARCHIVED
                : ResourceStatus.APPROVED;

        const accessibility: FileAccessibility =
            resource.accessibility === FileAccessibility.HIDDEN
                ? FileAccessibility.PUBLIC
                : FileAccessibility.HIDDEN;
        axios
            .patch(`/api/resource/a/${resource.id}`, {
                accessibility,
                status,
            })
            .then(() => {
                toast({
                    status: "success",
                    title: "Resource Has Been Archived",
                });
                reload();
            })
            .catch((err) => {
                console.log(err);
                toast({
                    status: "error",
                    title: "An error has occured updating the resource.",
                });
            });
    };

    return (
        <>
            <MenuList>
                <MenuItem onClick={() => onDownload()}>Download</MenuItem>
                <MenuItem onClick={() => onManage(resource)}>Manage</MenuItem>
                <MenuItem onClick={() => updateStatus()}>
                    {resource.status === ResourceStatus.APPROVED
                        ? "Move To Trash"
                        : "Make Available"}
                </MenuItem>
            </MenuList>
            
        </>
    );
};

export default CEAPMenuList;
