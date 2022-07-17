import { FC } from "react";

import { VStack, Text, Heading, Box } from "@chakra-ui/react";

import { motion } from "framer-motion";

const HistoryItem: FC<{ heading?: string; story?: string | string[] }> = ({
    heading,
    story,
}) => {
    return (
        <VStack
            align={"flex-start"}
            as={motion.div}
            initial={{ x: -5, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            pl={"10"}
            position={"relative"}
            spacing={'1'}
        >

                <Box p={"4"} bg={"secondary"} rounded={'md'}>
                    <Heading position={"relative"} fontSize={"xl"} textTransform={"uppercase"}>
                        {heading}
                    </Heading>
                </Box>
                <Box rounded={'md'} p={'4'} bg={'secondary'}>
                    {typeof story === "string" ? (
                        <Text position={"relative"} fontSize={"md"}>
                            {story}
                        </Text>
                    ) : (
                        <VStack position={"relative"} fontSize={"md"}>
                            {story?.map((val, i) => (
                                <Text key={i}>{val}</Text>
                            ))}
                        </VStack>
                    )}
                </Box>
            <Box
                position={"absolute"}
                left={"0"}
                top={"50%"}
                transform={"auto"}
                rounded={"full"}
                translateY={"-50%"}
                p={"2"}
                bg={"secondary"}
            />
        </VStack>
    );
};

export default HistoryItem;
