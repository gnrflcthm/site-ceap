import { FC, useState } from "react";
import { UserRegistration as RegistrationData } from "@prisma/client";

import { Flex, Heading, Text, VStack, Tr, Td, Box } from "@chakra-ui/react";
import axios from "axios";

import { FaEllipsisV } from "react-icons/fa";

const RegistrationData: FC<{ data: RegistrationData }> = ({ data }) => {
    const {
        firstName,
        lastName,
        middleName,
        mobileNumber,
        emailAddress,
        id,
        registeredAt,
        schoolId,
    } = data;
    const [hovered, setHovered] = useState<boolean>(false);

    const accept = async () => {
        let { status } = await axios.post("/api/member/accept", { id });
        console.log("Accept Status: ", status);
    };

    return (
        <Tr
            p={0}
            _hover={{
                bg: "blackAlpha.50",
            }}
        >
            <Td px={"4"} py={"2"} w={"5%"}>
                <Text fontSize={"md"}>
                    {registeredAt ? registeredAt.toLocaleDateString() : ""}
                </Text>
            </Td>
            <Td px={"4"} py={"2"}>
                <VStack spacing={"0"} align={"flex-start"}>
                    <Heading
                        fontSize={"md"}
                    >{`${lastName}, ${firstName} ${middleName[0]}.`}</Heading>
                    <Text fontSize={"sm"}>{emailAddress}</Text>
                </VStack>
            </Td>
            <Td px={"4"} py={"2"}>
                <Text fontSize={"md"}>{mobileNumber ?? ""}</Text>
            </Td>
            <Td px={"4"} py={"2"}>
                <Text fontSize={"md"}>{schoolId ?? ""}</Text>
            </Td>
            <Td px={"4"} py={"2"}>
                <Box as={FaEllipsisV} onClick={() => {}} cursor={"pointer"} />
            </Td>
        </Tr>
    );
};

export default RegistrationData;
