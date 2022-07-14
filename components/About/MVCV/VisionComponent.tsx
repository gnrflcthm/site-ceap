import { FC } from "react";

import { Flex, Heading, Box, Text } from "@chakra-ui/react";

import Bold from "../../Bold";
import MVCVHeading from "./MVCVHeading";

const VisionComponent: FC = () => {
    return (
        <Flex flexDir={"column"} align={"center"} zIndex={"3"} w={"full"}>
            <MVCVHeading heading={"Our Vision"} />
            <Box position={"relative"} w={"70%"} display={"inline-block"}>
                <Box
                    bg={"primary"}
                    h={"full"}
                    w={"full"}
                    position={"absolute"}
                    top={"0"}
                    left={"0"}
                    opacity={"0.9"}
                />
                <Text
                    p={"10"}
                    color={"neutralizerLight"}
                    alignSelf={"center"}
                    zIndex={"3"}
                    position={"relative"}
                >
                    A world transformed, a Philippines renewed by the people
                    educated in the principles of{" "}
                    <Bold>Communio and Service</Bold> as taught and lived by our{" "}
                    <Bold>Lord Jesus Christ</Bold> and shaped by the missionary
                    mandate of the <Bold>Catholic Church</Bold>.
                </Text>
            </Box>
        </Flex>
    );
};

export default VisionComponent;
