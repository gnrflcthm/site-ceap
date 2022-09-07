import { FC, useState } from "react";
import { UserRegistration as RegistrationData } from "@prisma/client";

import { Flex, Heading, Text, VStack } from "@chakra-ui/react";
import axios from "axios";

const RegistrationData: FC<{ data: RegistrationData }> = ({ data }) => {
    const { firstName, lastName, middleName, mobileNumber, emailAddress, id } =
        data;
    const [hovered, setHovered] = useState<boolean>(false);

    const accept = async () => {
        let { status } = await axios.post("/api/member/accept", { id });
        console.log("Accept Status: ", status);
    };

    return (
        <Flex
            justify={"space-between"}
            align={"stretch"}
            w={"full"}
            bg={hovered ? "secondary" : "white"}
            p={"4"}
            rounded={"md"}
            boxShadow={"md"}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => accept()}
        >
            <VStack spacing={"2"} align={"flex-start"}>
                <Heading
                    fontSize={"xl"}
                >{`${lastName}, ${firstName} ${middleName}`}</Heading>
                <Text fontSize={"md"} color={"neutralizerDark"}>
                    {emailAddress}
                </Text>
            </VStack>
            <Text>{mobileNumber}</Text>
        </Flex>
    );
};

export default RegistrationData;
