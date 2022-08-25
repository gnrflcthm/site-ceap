import { PageWithLayout } from "./_app";

import UserInfo from "@components/Profile/UserInfo";

import { VStack, Heading, Divider, SimpleGrid } from "@chakra-ui/react";
import Layout from "@components/Layout";

const Profile: PageWithLayout = () => {
    return (
        <VStack align={"stretch"} p={"10"} spacing={"8"}>
            <Heading>Account Information</Heading>
            <VStack align={"flex-start"}>
                <Heading fontSize={"2xl"}>Basic Information</Heading>
                <Divider borderColor={"neutralizerDark"} />
                <SimpleGrid
                    templateRows={"1fr 1fr 1fr 1fr 1fr"}
                    gridAutoFlow={"column"}
                    w={"full"}
                    spacingX={"10"}
                    spacingY={"4"}
                >
                    <UserInfo label={"Name"} value={"First Last"} />
                    <UserInfo
                        label={"Email"}
                        value={"testemail@mail.com"}
                    />
                    <UserInfo
                        label={"Contact No."}
                        value={"+63 069 420 2001"}
                    />
                </SimpleGrid>
            </VStack>
        </VStack>
    );
};

Profile.PageLayout = Layout;

export default Profile;
