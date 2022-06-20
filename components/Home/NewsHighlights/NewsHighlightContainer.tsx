import { FC } from "react";

import NextLink from "next/link";
import Image, { StaticImageData } from "next/image";

import { Box, Flex, Link, Text, Heading } from "@chakra-ui/react";

interface NewsHighlightContainerProps {
    coverPhoto: StaticImageData;
    headline: string;
    date: string | Date;
    story: string;
}

const NewsHighlightContainer: FC<NewsHighlightContainerProps> = ({
    coverPhoto,
    headline,
    date,
    story,
}) => {
    return (
        <Box h={"fit-content"} mx={"4"} my={{base: "8", md: "0"}} w={{base: "full", md: "33%"}} position={"relative"}>
            <Box
                position={"relative"}
                bg={"red.200"}
                w={"full"}
                h={"60"}
                objectFit={"cover"}
                overflow={"hidden"}
            >
                <Image
                    src={coverPhoto}
                    layout={"fill"}
                    objectFit={"cover"}
                    objectPosition={"center"}
                />
            </Box>
            <Box position={"absolute"} w={"full"} p={"4"} top={"40%"}>
                <Box bg={"white"} p={"4"}>
                    <Heading>{headline}</Heading>
                    <Text>{date.toLocaleString()}</Text>
                    <Text>{story.substring(0, 100) + "..."}</Text>
                    <Link textAlign={"end"} display={"block"}>
                        Read More
                    </Link>
                </Box>
            </Box>
        </Box>
    );
};

export default NewsHighlightContainer;
