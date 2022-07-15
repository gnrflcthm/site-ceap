import { FC, PropsWithChildren } from "react";
import { NextPage } from "next";
import Head from "next/head";
import SectionHeading from "../../../../components/SectionHeading";
import PhotosComponent from "../../../../components/NewsEvents/Photos/PhotosComponent"
import img1 from "../../../../assets/News and Events/Photos/1.jpg"

import { Box, Flex, Text, VStack, Heading } from "@chakra-ui/react";

const Photos: NextPage = () => {
    return (
        <>
            <Head>
                <title>Photo Gallery</title>
            </Head>
            <SectionHeading color="primary">
                PHOTO GALLERY
            </SectionHeading>
            <Flex justifyContent={"center"} my={10} flexDir={"row"}>
                <PhotosComponent src={img1.src} heading="Lorem ipsum dolor sit amet." date="July 15, 2022"></PhotosComponent>
                <PhotosComponent src={img1.src} heading="Lorem ipsum dolor sit amet." date="July 15, 2022"></PhotosComponent>
                <PhotosComponent src={img1.src} heading="Lorem ipsum dolor sit amet." date="July 15, 2022"></PhotosComponent>
            </Flex>
            <Flex justifyContent={"center"} my={10} flexDir={"row"}>
                <PhotosComponent src={img1.src} heading="Lorem ipsum dolor sit amet." date="July 15, 2022"></PhotosComponent>
                <PhotosComponent src={img1.src} heading="Lorem ipsum dolor sit amet." date="July 15, 2022"></PhotosComponent>
                <PhotosComponent src={img1.src} heading="Lorem ipsum dolor sit amet." date="July 15, 2022"></PhotosComponent>
            </Flex>
            <Flex justifyContent={"center"} my={10} flexDir={"row"}>
                <PhotosComponent src={img1.src} heading="Lorem ipsum dolor sit amet." date="July 15, 2022"></PhotosComponent>
                <PhotosComponent src={img1.src} heading="Lorem ipsum dolor sit amet." date="July 15, 2022"></PhotosComponent>
                <PhotosComponent src={img1.src} heading="Lorem ipsum dolor sit amet." date="July 15, 2022"></PhotosComponent>
            </Flex>
        </>
    );
};

export default Photos;
