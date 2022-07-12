import { FC } from "react";

import NextLink from "next/link";

import { Flex, VStack, Heading, Text, Button, Box } from "@chakra-ui/react";

interface HeroItemProps {
    headline: string;
    story: string;
    storyRedirect?: string;
    coverImage?: string;
}

const HeroItem: FC<HeroItemProps> = ({
    headline,
    story,
    storyRedirect,
    coverImage,
}) => {
    return (
        <Flex
            justify={"space-between"}
            w={"full"}
            flex={"1"}
            px={{ base: "4", md: "10" }}
        >
            <Box
                w={"full"}
                h={"full"}
                position={"absolute"}
                bg={`linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url(${coverImage})`}
                bgPos={"center"}
                bgSize={"cover"}
                left={"0"}
                top={"0"}
            />
            <VStack
                zIndex={"5"}
                align={"flex-start"}
                justify={"center"}
                spacing={"4"}
                color={"neutralizerLight"}
                flexBasis={{ base: "80%", md: "50%" }}
                pt={"4"}
            >
                <Heading
                    textAlign={"left"}
                    fontSize={"4xl"}
                    m={"0"}
                    lineHeight={"1"}
                >
                    {headline}
                </Heading>
                <Text fontSize={"sm"}>{story}</Text>
                <NextLink href={storyRedirect || ""}>
                    <Button
                        bgColor={"secondary"}
                        color={"neutralizerLight"}
                        rounded={"none"}
                    >
                        Read More
                    </Button>
                </NextLink>
            </VStack>
        </Flex>
    );
};

export default HeroItem;
