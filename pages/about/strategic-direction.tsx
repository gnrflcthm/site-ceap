import { FC, useState } from "react";
import Head from "next/head";
import { Tabs, TabList, TabPanels, Tab, TabPanel, Center, Box, Flex, Heading, Text, Button } from "@chakra-ui/react";
import SectionHeading from "../../components/SectionHeading";
import StrategicDirectionNav from "../../components/About/StrategicDirection/StrategicDirectionNav";

const StrategicDirection: FC = () => {
    const [current, setCurrent] = useState("BoardOfTrustees")
    return (
        <>
            <Head>
                <title>Strategic Directions</title>
            </Head>
            <SectionHeading color={"primary"} my={"10"}>Strategic Directions</SectionHeading>
            <Box bg='primary' w="100%" h='100%' p={10} my={"10"} color='white'>
                <Text align={"center"} fontWeight="bold" fontStyle="italic" fontSize='45px'>2017 Strategic Planning Workshop</Text>
                <StrategicDirectionNav></StrategicDirectionNav>
            </Box>

        </>
    );
};

export default StrategicDirection;
