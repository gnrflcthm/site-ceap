import { FC } from "react";

import { VStack, Heading, Text, Button } from "@chakra-ui/react";

const SuccessPage: FC = () => {
    return (
        <VStack spacing={"4"}>
            <Heading fontSize={"2xl"} textAlign={"center"}>
                Thank You For Registering
            </Heading>
            <Text fontSize={{base: "lg"}} textAlign={"center"}>
                Your administrator will be notified. Your login credentials will
                be sent to your email in a few days.
            </Text>
            <Button variant={"secondary"} as={"a"} href={"/"}>
                Return To Main Page
            </Button>
        </VStack>
    );
};

export default SuccessPage;
