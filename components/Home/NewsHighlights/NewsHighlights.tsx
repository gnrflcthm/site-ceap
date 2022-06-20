import { FC } from "react";

import { StaticImageData } from "next/image";

import { Box, Heading, Flex, Button } from "@chakra-ui/react";
import NewsHighlightContainer from "./NewsHighlightContainer";

interface NewsHighlightsProps {
    newsData: NewsHighlight[];
}

export interface NewsHighlight {
    coverPhoto: StaticImageData;
    headline: string;
    date: string | Date;
    story: string;
}

const NewsHighlights: FC<NewsHighlightsProps> = ({ newsData }) => {
    return (
        <Flex
            p={{ base: "2", md: "4" }}
            bg={"#EEE"}
            my={{ base: "4", md: "0" }}
            flexDir={"column"}
            justifyContent={"space-between"}
            alignItems={"center"}
        >
            <Heading
                textAlign={"center"}
                my={"4"}
                position={"relative"}
                _after={{
                    content: `""`,
                    bg: "black",
                    position: "absolute",
                    width: "100%",
                    h: "1",
                    top: "50%",
                    left: "110%",
                }}
                _before={{
                    content: `""`,
                    bg: "black",
                    position: "absolute",
                    width: "100%",
                    h: "1",
                    top: "50%",
                    right: "110%",
                }}
            >
                News & Events
            </Heading>
            <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                flexDir={{ base: "column", md: "row" }}
                px={["2", "4"]}
                alignSelf={"stretch"}
            >
                {newsData.map((news, i) => (
                    <NewsHighlightContainer {...news} key={i} />
                ))}
            </Flex>
            <Flex
                justifyContent={"end"}
                px={"8"}
                mt={{ base: "8", md: "20" }}
                alignSelf={"end"}
            >
                <Button w={{ base: "full", md: "initial" }}>Read More</Button>
            </Flex>
        </Flex>
    );
};

export default NewsHighlights;
