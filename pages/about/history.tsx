import { FC } from "react";

import { Flex, Box, VStack, Heading } from "@chakra-ui/react";
import SectionHeading from "../../components/SectionHeading";
import { HistoryDisplay } from "../../components/About/History";

const History: FC = () => {
    return (
        <Flex minH={"100vh"} flexDir={"column"} alignItems={"center"} p={"4"}>
            <Box my={"4"}>
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
