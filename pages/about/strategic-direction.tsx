import { useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import { Box, Text } from "@chakra-ui/react";
import SectionHeading from "../../components/SectionHeading";
import StrategicDirectionNav from "../../components/About/StrategicDirection/StrategicDirectionNav";

const StrategicDirection: NextPage = () => {
    const [current, setCurrent] = useState("BoardOfTrustees");
    return (
        <>
            <Head>
                <title>Strategic Directions</title>
            </Head>
            <SectionHeading color={"primary"} my={"10"}>
                Strategic Directions
            </SectionHeading>
            <Box
                bg={"primary"}
                w={"full"}
                h={"full"}
                p={"10"}
                my={"10"}
                color={"neutralizerLight"}
            >
                <Text
                    align={"center"}
                    fontWeight={"bold"}
                    fontStyle={"italic"}
                    fontSize={"4xl"}
                >
                    2017 Strategic Planning Workshop
                </Text>
                <StrategicDirectionNav />
            </Box>
        </>
    );
};

export default StrategicDirection;
