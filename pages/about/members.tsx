import { FC, useState } from "react";
import Head from "next/head";
import { Members as MembersContent } from "../../components/About/Members";
import { BoardOfTrustees  } from "../../components/About/Members/BoardOfTrustees";
import { CommissionsCommittees } from "../../components/About/Members/CommissionsCommittees";
import { NationalSecretariat } from "../../components/About/Members/NationalSecretariat";
import { Center, Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import SectionHeading from "../../components/SectionHeading";

const Members: FC = () => {
    const [current, setCurrent] = useState("BoardOfTrustees")
    return (
        <>
            <Head>
                <title>Meet the Members</title>
            </Head>
            <SectionHeading color={"primary"} my={"10"}>Meet the Members</SectionHeading>
            <MembersContent
                title={"Board Of Trustees"}
                active={current === "BoardOfTrustees"}
                onClick={() => setCurrent("BoardOfTrustees")}
            />
            <MembersContent
                title={"Commissions & Committees"}
                active={current === "CommissionsCommittees"}
                onClick={() => setCurrent("CommissionsCommittees")}
            />
            <MembersContent
                title={"National Secretariat"}
                active={current === "NationalSecretariat"}
                onClick={() => setCurrent("NationalSecretariat")}
            />

            <Box p={"5"}>
                {current === "BoardOfTrustees" ? <BoardOfTrustees /> : ""}
                {current === "CommissionsCommittees" ? <CommissionsCommittees /> : ""}
                {current === "NationalSecretariat" ? <NationalSecretariat /> : ""}
            </Box>

        </>
    );
};

export default Members;
