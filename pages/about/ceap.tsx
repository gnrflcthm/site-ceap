import { FC, PropsWithChildren } from "react";
import { NextPage } from "next";
import Head from "next/head";

import { Box, Flex, Text, VStack, Heading } from "@chakra-ui/react";

import AboutUs from "../../components/About/AboutUs";
import MVCV from "../../components/About/MVCV/MVCV";

const About: NextPage = () => {
    return (
        <>
            <Head>
                <title>About Us</title>
            </Head>
            <AboutUs />
            <MVCV />
        </>
    );
};

export default About;
