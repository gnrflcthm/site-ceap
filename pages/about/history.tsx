import { NextPage } from "next";

import { Flex, Box, Heading } from "@chakra-ui/react";
import SectionHeading from "../../components/SectionHeading";
import { HistoryDisplay } from "../../components/About/History";

const History: NextPage = () => {
    return (
        <Flex
            minH={"100vh"}
            flexDir={"column"}
            alignItems={"center"}
            px={"8"}
            py={"10"}
        >
            <Box mb={"10"}>
                <SectionHeading color={"primary"} my={"0"}>
                    History Of CEAP
                </SectionHeading>
                <Heading
                    textAlign={"center"}
                    color={"primary"}
                    as={"h2"}
                    fontSize={"xl"}
                >
                    More than seven decades of communication and service to the
                    country.
                </Heading>
            </Box>
            <HistoryDisplay />
        </Flex>
    );
};

export default History;
