import { FC, PropsWithChildren } from "react";
import { NextPage } from "next";
import Head from "next/head";
import SectionHeading from "../../../../components/SectionHeading";
import VideosComponent from "../../../../components/NewsEvents/Videos/VideosComponent"
import img1 from "../../../../assets/News and Events/Videos/1.jpg"

import { Box, Flex, Text, VStack, Heading } from "@chakra-ui/react";

const Videos: NextPage = () => {
    return (
        <>
            <Head>
                <title>Video Gallery</title>
            </Head>
            <SectionHeading color="primary">
                VIDEO GALLERY
            </SectionHeading>
            <Flex justifyContent={"center"} my={10} flexDir={"row"}>
                <VideosComponent src={img1.src} heading="Lorem"></VideosComponent>
                <VideosComponent src={img1.src} heading="Lorem"></VideosComponent>
                <VideosComponent src={img1.src} heading="Lorem"></VideosComponent>
            </Flex>
            <Flex justifyContent={"center"} my={10} flexDir={"row"}>
                <VideosComponent src={img1.src} heading="Lorem"></VideosComponent>
                <VideosComponent src={img1.src} heading="Lorem"></VideosComponent>
                <VideosComponent src={img1.src} heading="Lorem"></VideosComponent>
            </Flex>
            <Flex justifyContent={"center"} my={10} flexDir={"row"}>
                <VideosComponent src={img1.src} heading="Lorem"></VideosComponent>
                <VideosComponent src={img1.src} heading="Lorem"></VideosComponent>
                <VideosComponent src={img1.src} heading="Lorem"></VideosComponent>
            </Flex>
        </>
    );
};

export default Videos;
