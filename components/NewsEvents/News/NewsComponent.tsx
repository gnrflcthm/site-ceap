import { FC } from "react";
import { Center, Box, Flex, Text, ListItem, UnorderedList, VStack, Heading, Button, } from "@chakra-ui/react";
import Image, { StaticImageData } from "next/image";


interface NewsProps {
    src: string;
    heading: string;
    date: string;
    story: string;
}

const NewsComponent: FC<NewsProps> = ({ src, heading, date, story }) => {
    return (
        <Flex borderRadius='md' w="50%" bg={"primaryAccent"} px="10" justifyContent="space-between">
            <Box overflow={"hidden"} position={"relative"} objectFit={"cover"} p={150} >
                <Image layout={"fill"} objectFit={"contain"} src={src} />
            </Box>
            <VStack p="10" align={"flex-start"} flex={1}>
                <Heading>{heading}</Heading>
                <Text fontSize={14}>{date}</Text>
                <Text>{story}</Text>
                <Button alignSelf={"flex-end"}>Read More</Button>
            </VStack>
        </Flex>
    );
};

export default NewsComponent;