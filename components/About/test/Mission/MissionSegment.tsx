import { FC } from "react";

import {
    Box,
    VStack,
    Heading,
    UnorderedList,
    ListItem,
} from "@chakra-ui/react";

const MissionSegment: FC<{ heading: string; details: string[] }> = ({
    heading,
    details,
}) => {
    return (
        <Box w={"full"} p={"4"} bg={"white"} color={"primary"} rounded={"md"}>
            <VStack alignItems={"flex-start"}>
                <Heading as={"h3"} fontSize={"2xl"}>
                    {heading}
                </Heading>
                <UnorderedList pl={"8"}>
                    {details.map((val, idx) => (
                        <ListItem key={idx}>{val}</ListItem>
                    ))}
                </UnorderedList>
            </VStack>
        </Box>
    );
};

export default MissionSegment;
