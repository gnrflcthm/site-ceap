import { FC } from "react";

import { VStack, Box, Flex, Text, Heading } from "@chakra-ui/react";

import Bold from "../../Bold";
import CircleDecor from "../../CircleDecor";
import MissionItem from "./MissionItem";
import MissionComponent from "./MissionComponent";
import VisionComponent from "./VisionComponent";
import CoreValues from "./CoreValues";



const MVCV: FC = () => {
    return (
        <VStack
            w={"full"}
            py={"10"}
            position={"relative"}
            overflow={"hidden"}
            spacing={"10"}
        >
            <CircleDecor top={"0"} left={"0"} scale={"5"} color={"secondary"} />
            <CircleDecor
                top={"80%"}
                left={"0"}
                scale={"6"}
                color={"secondary"}
            />
            <CircleDecor
                top={"50%"}
                left={"50%"}
                scale={"3"}
                color={"secondary"}
            />
            <CircleDecor
                top={"5%"}
                right={"15%"}
                scale={"4"}
                color={"secondary"}
            />
            <CircleDecor
                top={"50%"}
                right={"0"}
                scale={"7"}
                color={"secondary"}
            />
            <VisionComponent />
            <MissionComponent />
            <CoreValues />
        </VStack>
    );
};

export default MVCV;
