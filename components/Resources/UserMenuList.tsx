import { MenuItem, MenuList } from "@chakra-ui/react";
import { FC } from "react";

const UserMenuList: FC<{ onDownload: Function }> = ({ onDownload }) => {
    return (
        <MenuList>
            <MenuItem onClick={() => onDownload()}>Download</MenuItem>
        </MenuList>
    );
};

export default UserMenuList;
