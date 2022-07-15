import { FC } from "react";
import { Center, Box, Flex, Text, ListItem, UnorderedList, VStack, Heading, Button, } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";


interface PhotosProps {
    src: string;
    heading: string;
    date: string;
}

const PhotosComponent: FC<PhotosProps> = ({ src, heading, date }) => {
    return (
        <Flex width={"fit-content"} flexDir={"column"} alignContent={"center"} borderRadius='md' px="10">
            <Box position={"relative"} objectFit={"cover"} p={150} >
                <Image layout={"fill"} objectFit={"cover"} src={src} />
            </Box>
            <Heading>{heading}</Heading>
            <Text>{date}</Text>
        </Flex>
    );
};

export default PhotosComponent;