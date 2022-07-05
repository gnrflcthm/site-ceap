import { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import {
    MVCVNav,
    CoreValues,
    Mission,
    Vision,
} from "../../components/About/test";
import { Box, HStack } from "@chakra-ui/react";
import SectionHeading from "../../components/SectionHeading";

const components = {
    Mission: Mission,
    Vision: Vision,
    CoreValues: CoreValues,
};

const MissionVisionValues: NextPage = () => {
    const [current, setCurrent] = useState<string>("Mission");

    const MVCVPage = components[current as keyof typeof components];

    return (
        <Box px={"8"}>
            <Head>
                <title>Mission, Vision, & Core Values</title>
            </Head>
            <SectionHeading color={"primary"} my={"10"}>
                Mission, Vision, & Core Values
            </SectionHeading>
            <HStack>
                <MVCVNav
                    title={"Mission"}
                    active={current === "Mission"}
                    onClick={() => setCurrent("Mission")}
                />
                <MVCVNav
                    title={"Vision"}
                    active={current === "Vision"}
                    onClick={() => setCurrent("Vision")}
                />
                <MVCVNav
                    title={"Core Values"}
                    active={current === "CoreValues"}
                    onClick={() => setCurrent("CoreValues")}
                />
            </HStack>
            <Box py={"4"}>
                <MVCVPage />
            </Box>
        </Box>
    );
};

export default MissionVisionValues;
