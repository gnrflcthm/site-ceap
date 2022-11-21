import { useState, createContext } from "react";
import { PageWithLayout } from "./_app";

import Head from "next/head";

import UserInfo from "@components/Profile/UserInfo";

import {
    VStack,
    Heading,
    Divider,
    SimpleGrid,
    Flex,
    Button,
    useToast,
    CircularProgress,
} from "@chakra-ui/react";
import Layout from "@components/Layout";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import AuthGetServerSideProps, {
    GetServerSidePropsContextWithUser,
} from "@util/api/authGSSP";

import axios, { AxiosError } from "axios";
import UpdatePasswordModal from "@components/Profile/UpdatePasswordModal";
import TopPanel from "@components/TopPanel";
import { connectDB, IUserSchema, User } from "@db/index";

export const ProfileModeContext = createContext<[boolean, Function]>([
    false,
    () => {},
]);

const Profile: PageWithLayout<
    InferGetServerSidePropsType<typeof getServerSideProps>
> = ({ userInfo }) => {
    const [updating, setUpdating] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const toast = useToast();

    const [showUpdatePassword, setShowUpdatePassword] =
        useState<boolean>(false);

    const [displayName, setDisplayName] = useState<string>(
        userInfo?.displayName || ""
    );

    const save = () => {
        setLoading(true);
        axios
            .post("/api/user/update", {
                displayName /* Add more fields according to updateable fields */,
            })
            .then(() => {
                toast({
                    title: "Profile Updated Successfully",
                    status: "success",
                });
            })
            .catch((err: AxiosError) => {
                console.log(err.response?.statusText);
                toast({
                    title: "An Error Has Occured While Updating Your Profile",
                    status: "error",
                });
            })
            .finally(() => {
                setUpdating(false);
                setLoading(false);
            });
    };

    return (
        <>
            <Head>
                <title>Profile</title>
            </Head>
            <VStack
                align={"stretch"}
                spacing={"2"}
                flex={"1"}
                position={"relative"}
                overflow={"hidden"}
                overflowY={"auto"}
            >
                <TopPanel title={"Profile"} />
                <VStack align={"flex-start"} p={"4"} m={"0"}>
                    <Heading fontSize={{ base: "lg", lg: "2xl" }}>
                        Basic Information
                    </Heading>
                    <Divider borderColor={"neutralizerDark"} />
                    <SimpleGrid
                        templateColumns={{ base: "1fr", lg: "1fr 1fr" }}
                        gridAutoFlow={"row"}
                        w={"full"}
                        spacingX={"10"}
                        spacingY={"4"}
                    >
                        <ProfileModeContext.Provider
                            value={[updating, setUpdating]}
                        >
                            <UserInfo
                                label={"Name"}
                                value={`${userInfo?.firstName} ${
                                    userInfo?.middleName
                                        ? userInfo?.middleName[0] + "."
                                        : ""
                                } ${userInfo?.lastName}`}
                            />
                            <UserInfo
                                label={"Display Name"}
                                value={displayName}
                                setValue={setDisplayName}
                                isEditable
                            />
                            <UserInfo
                                label={"Email"}
                                value={`${userInfo?.email}`}
                            />
                            <UserInfo
                                label={"Contact No."}
                                value={`${userInfo?.mobileNumber || "N/A"}`}
                            />
                            <UserInfo
                                label={"Member School"}
                                value={`${
                                    userInfo?.memberSchool?.name || "N/A"
                                }`}
                            />
                            <UserInfo
                                label={"Password"}
                                placeholder={"Update Password"}
                                onClick={() => setShowUpdatePassword(true)}
                                isEditable
                                isHidden
                            />
                        </ProfileModeContext.Provider>
                    </SimpleGrid>
                </VStack>
                <UpdatePasswordModal
                    email={userInfo?.email}
                    show={showUpdatePassword}
                    setShow={setShowUpdatePassword}
                />
                {updating && (
                    <Flex justify={"flex-end"} align={"center"} p={"4"}>
                        <Button
                            w={"fit-content"}
                            onClick={() => {
                                setDisplayName(userInfo?.displayName || "");
                                setUpdating(false);
                            }}
                            mr={"2"}
                            bg={"red.500"}
                            _hover={{
                                bg: "red.300",
                            }}
                            disabled={loading}
                            size={{ base: "sm", md: "md" }}
                        >
                            Cancel
                        </Button>
                        <Button
                            w={"fit-content"}
                            bg={"green.500"}
                            _hover={{
                                bg: "green.300",
                            }}
                            onClick={() => save()}
                            disabled={loading}
                            size={{ base: "sm", md: "md" }}
                        >
                            {loading ? (
                                <CircularProgress isIndeterminate size={6} />
                            ) : (
                                "Save Changes"
                            )}
                        </Button>
                    </Flex>
                )}
            </VStack>
        </>
    );
};

Profile.PageLayout = Layout;

export interface IUserInfo {
    id: string;
    displayName?: string;
    email: string;
    mobileNumber?: string;
    memberSchool?: {
        name: string;
    };
    firstName: string;
    lastName: string;
    middleName?: string;
}

export const getServerSideProps: GetServerSideProps<{
    userInfo?: IUserSchema & {
        id: string;
        memberSchool: { id: string; name: string };
    };
}> = AuthGetServerSideProps(
    async ({ uid }: GetServerSidePropsContextWithUser) => {
        await connectDB();

        const userInfo = await User.findOne(
            { authId: uid },
            {},
            {
                fields: [
                    "id",
                    "displayName",
                    "email",
                    "mobileNumber",
                    "memberSchool.name",
                    "firstName",
                    "lastName",
                    "middleName",
                ],
            }
        )
            .populate("memberSchool", ["id", "name"])
            .exec();

        return {
            props: {
                userInfo: userInfo?.toJSON(),
            },
        };
    }
);

export default Profile;
