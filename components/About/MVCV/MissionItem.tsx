import { FC } from "react";

import { VStack, Heading, Text, Box } from "@chakra-ui/react";

interface MissionItemProps {
    heading: string;
    goals: string[];
}

const MissionItem: FC<MissionItemProps> = ({ heading, goals }) => {
    return (
        <VStack
            flexBasis={"30%"}
            align={"stretch"}
            px={"8"}
            py={"4"}
            color={"neutralizerLight"}
            position={"relative"}
        >
            <Box
                w={"full"}
                h={"full"}
                bg={"primary"}
                top={"0"}
                left={"0"}
                opacity={"0.9"}
                position={"absolute"}
            />
            <Heading
                textAlign={"center"}
                as={"h2"}
                fontSize={"xl"}
                zIndex={"3"}
            >
                {heading}
            </Heading>
            <VStack as={"ul"} align={"flex-start"} zIndex={"3"}>
                {goals.map((goal, i) => (
                    <Text as={"li"}>{goal}</Text>
                ))}
            </VStack>
        </VStack>
    );
};

export default MissionItem;
