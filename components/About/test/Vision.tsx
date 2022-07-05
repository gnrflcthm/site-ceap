import { FC } from "react";
import { Box, Text, Heading } from "@chakra-ui/react";

const Vision: FC = () => {
    return (
        <Box bg="primary" p={"10"}>
            <Heading
                as={"h2"}
                fontSize={"4xl"}
                textAlign={"center"}
                color={"white"}
                fontStyle={"italic"}
            >
                Vision
            </Heading>
            <Box
                rounded={"md"}
                bg={"white"}
                p={"4"}
                my={"4"}
                mx={"auto"}
                color={"primary"}
                fontSize={"xl"}
                textAlign={"center"}
            >
                <Text p={"4"}>
                    A world transformed, a Philippines renewed by the people
                    educated in the principles of{" "}
                    <Text display={"inline"} as="span" fontWeight="bold">
                        Communio and Service{" "}
                    </Text>
                    as taught and lived by our{" "}
                    <Text display={"inline"} as={"span"} fontWeight={"bold"}>
                        Lord Jesus Christ
                    </Text>{" "}
                    and shaped by the missionary mandate of the{" "}
                    <Text display={"inline"} as={"span"} fontWeight={"Bold"}>
                        Catholic Church.
                    </Text>
                </Text>
            </Box>
        </Box>
    );
};

export default Vision;
