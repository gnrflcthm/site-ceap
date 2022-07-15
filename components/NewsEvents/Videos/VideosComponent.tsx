import { FC } from "react";
import { Center, Box, Flex, Text, ListItem, UnorderedList, VStack, Heading, Button, } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";


interface PhotosProps {
    src: string;
    heading: string;
}

const VideosComponent: FC<PhotosProps> = ({ src, heading }) => {
    return (
        <Flex width={"fit-content"} flexDir={"column"} justifyContent="center" alignContent={"center"} borderRadius='md' px="10">
            <Box position={"relative"} objectFit={"cover"} p={150} >
                <Image layout={"fill"} objectFit={"cover"} src={src} />
            </Box>
            <Heading>{heading}</Heading>
        </Flex>
    );
};

export default VideosComponent;