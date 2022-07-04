import { FC, useState } from "react";
import Head from "next/head";
import { test as Test } from "../../components/About/test";
import { mission as Mission } from "../../components/About/test/Mission";
import { vision as Vision } from "../../components/About/test/Vision";
import { coreValues as CoreValues } from "../../components/About/test/CoreValues";
import { Center, Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import SectionHeading from "../../components/SectionHeading";

const MissionVisionValues: FC = () => {
    const [current, setCurrent] = useState("Mission")
    return (
        <>
            <Head>
                <title>Mission, Vision, & Core Values</title>
            </Head>
            <SectionHeading color={"primary"} my={"10"}>Mission, Vision, & Core Values</SectionHeading>
            <Test
                title={"Mission"}
                active={current === "Mission"}
                onClick={() => setCurrent("Mission")}
            />
            <Test
                title={"Vision"}
                active={current === "Vision"}
                onClick={() => setCurrent("Vision")}
            />
            <Test
                title={"Core Values"}
                active={current === "CoreValues"}
                onClick={() => setCurrent("CoreValues")}
            />
            {/* <Button rounded={"0"} size='lg' ml={"5"} mb={"10"} as='i' color="white" bg={'primary'}>Mission</Button>
            <Button rounded={"0"} size='lg' ml={"5"} mb={"10"} as='i' color="white" bg={'primary'}>Vision</Button>
            <Button rounded={"0"} size='lg' ml={"5"} mb={"10"} as='i' color="white" bg={'primary'}>Core Values</Button> */}

            <Box p={"5"}>
                {current === "Mission" ? <Mission /> : ""}
                {current === "Vision" ? <Vision /> : ""}
                {current === "CoreValues" ? <CoreValues /> : ""}
            </Box>

        </>
    );
};

export default MissionVisionValues;
