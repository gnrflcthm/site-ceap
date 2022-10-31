import { AccountType } from "@util/Enums";
import { FC } from "react";
import { BsCloudUpload } from "react-icons/bs";
import { FaHistory, FaUserCog } from "react-icons/fa";
import { HiUsers } from "react-icons/hi";
import CoreNavItem from "./CoreNavItem";

const Routes: FC<{ role: AccountType }> = ({ role }) => {
    switch (role) {
        case AccountType.CEAP_SUPER_ADMIN:
            return (
                <>
                    <CoreNavItem
                        name={"Upload Requests"}
                        href={"/ceap/upload_requests"}
                        icon={BsCloudUpload}
                    />
                    <CoreNavItem
                        name={"Audit Logs"}
                        href={"/logs"}
                        icon={FaHistory}
                    />
                    <CoreNavItem
                        name={"Registrations"}
                        href={"/user_registrations"}
                        icon={HiUsers}
                    />
                    <CoreNavItem
                        name={"Manage Accounts"}
                        href={"/ceap/users"}
                        icon={FaUserCog}
                    />
                </>
            );
        case AccountType.CEAP_ADMIN:
            return (
                <>
                    <CoreNavItem
                        name={"Upload Requests"}
                        href={"/ceap/upload_requests"}
                        icon={BsCloudUpload}
                    />
                    <CoreNavItem
                        name={"Audit Logs"}
                        href={"/logs"}
                        icon={FaHistory}
                    />
                    <CoreNavItem
                        name={"Registrations"}
                        href={"/user_registrations"}
                        icon={HiUsers}
                    />
                </>
            );
        case AccountType.MS_ADMIN:
            return (
                <>
                    <CoreNavItem
                        name={"Upload Requests"}
                        href={"/upload_requests"}
                        icon={BsCloudUpload}
                    />
                    <CoreNavItem
                        name={"Audit Logs"}
                        href={"/logs"}
                        icon={FaHistory}
                    />
                    <CoreNavItem
                        name={"Registrations"}
                        href={"/user_registrations"}
                        icon={HiUsers}
                    />
                    <CoreNavItem
                        name={"Manage Accounts"}
                        href={"/users"}
                        icon={FaUserCog}
                    />
                </>
            );
        case AccountType.MS_USER:
            return (
                <>
                    <CoreNavItem
                        name={"Uploads"}
                        href={"/uploads"}
                        icon={BsCloudUpload}
                    />
                </>
            );
    }
    return <></>;
};

export default Routes;
