import { FC } from "react";

import { Box, Flex } from "@chakra-ui/react";
import SectionHeading from "../components/SectionHeading";

import { ContactDetails } from "../components/Contact";

const ContactPage: FC = () => {
    return (
        <Box px={"8"}>
            <SectionHeading color={"primary"}>Contact Us</SectionHeading>
            <Flex
                justifyContent={"space-between"}
                alignItems={"stretch"}
                flexDir={{ base: "column", lg: "row" }}
            >
                <Flex flexBasis={"50%"}>
                    <ContactDetails />
                </Flex>
                <Box
                    flexBasis={"50%"}
                    bg={"green.500"}
                    h={"50vh"}
                    w={"full"}
                >test</Box>
            </Flex>
        </Box>
    );
};

export default ContactPage;
