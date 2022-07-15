import { FC, PropsWithChildren } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Region from "../components/MemberSchools/MemberSchoolsRegion"
import SchoolComponent from "../components/MemberSchools/MemberSchoolsComponent"
import { Link, Box, Flex, Text, VStack, Heading } from "@chakra-ui/react";

const MemberSchools: NextPage = () => {
    return (
        <>
            <Head>
                <title>Member Schools</title>
            </Head>
            <Flex my="10" justifyContent="center">
                <Box w={"max-content"}>
                    <Region />
                </Box>
                <Flex flexDir={"column"} alignItems={"center"}>
                        <Flex flexDir={"column"} alignItems={"center"}>
                            <Heading color={"primary"}>Member Schools</Heading>
                            <Text>School Members are Alphabetically arranged.</Text>
                            <Text>Is your school a CEAP Member but not listed here?</Text>
                            <Text>Email us at <Link as="span" color={"blue"}>info@ceap.org.ph</Link></Text>
                        </Flex>
                    <Flex justifyContent={"center"} alignItems="center" textAlign={"center"} w={"80%"}>
                        <SchoolComponent schoolName="Academia De San Agustin Doctor De La Gracia, Inc." schoolAddress="Bikini Bottom" />
                        <SchoolComponent schoolName="University of Santo Tomas" schoolAddress="Bikini Bottom" />
                    </Flex>
                    <Flex justifyContent={"center"} alignItems="center" textAlign={"center"} w={"80%"}>
                        <SchoolComponent schoolName="Academia De San Agustin Doctor De La Gracia, Inc." schoolAddress="Bikini Bottom" />
                        <SchoolComponent schoolName="University of Santo Tomas" schoolAddress="Bikini Bottom" />
                    </Flex>
                    <Flex justifyContent={"center"} alignItems="center" textAlign={"center"} w={"80%"}>
                        <SchoolComponent schoolName="Academia De San Agustin Doctor De La Gracia, Inc." schoolAddress="Bikini Bottom" />
                        <SchoolComponent schoolName="University of Santo Tomas" schoolAddress="Bikini Bottom" />
                    </Flex>
                    <Flex justifyContent={"center"} alignItems="center" textAlign={"center"} w={"80%"}>
                        <SchoolComponent schoolName="Academia De San Agustin Doctor De La Gracia, Inc." schoolAddress="Bikini Bottom" />
                        <SchoolComponent schoolName="University of Santo Tomas" schoolAddress="Bikini Bottom" />
                    </Flex>
                    <Flex justifyContent={"center"} alignItems="center" textAlign={"center"} w={"80%"}>
                        <SchoolComponent schoolName="Academia De San Agustin Doctor De La Gracia, Inc." schoolAddress="Bikini Bottom" />
                        <SchoolComponent schoolName="University of Santo Tomas" schoolAddress="Bikini Bottom" />
                    </Flex>
                    <Flex justifyContent={"center"} alignItems="center" textAlign={"center"} w={"80%"}>
                        <SchoolComponent schoolName="Academia De San Agustin Doctor De La Gracia, Inc." schoolAddress="Bikini Bottom" />
                        <SchoolComponent schoolName="University of Santo Tomas" schoolAddress="Bikini Bottom" />
                    </Flex>
                    <Flex justifyContent={"center"} alignItems="center" textAlign={"center"} w={"80%"}>
                        <SchoolComponent schoolName="Academia De San Agustin Doctor De La Gracia, Inc." schoolAddress="Bikini Bottom" />
                        <SchoolComponent schoolName="University of Santo Tomas" schoolAddress="Bikini Bottom" />
                    </Flex>
                    <Flex justifyContent={"center"} alignItems="center" textAlign={"center"} w={"80%"}>
                        <SchoolComponent schoolName="Academia De San Agustin Doctor De La Gracia, Inc." schoolAddress="Bikini Bottom" />
                        <SchoolComponent schoolName="University of Santo Tomas" schoolAddress="Bikini Bottom" />
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};

export default MemberSchools;
