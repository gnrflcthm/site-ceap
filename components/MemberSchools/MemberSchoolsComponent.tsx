import { FC } from "react";
import { Center, Box, Flex, Text, ListItem, UnorderedList, VStack, Heading, Button, } from "@chakra-ui/react";
import SectionHeading from "../SectionHeading";
import Image, { StaticImageData } from "next/image";


interface MemberSchoolsComponentProps {
    schoolName: string;
    schoolAddress: string;
}

const MemberSchoolsComponent: FC<MemberSchoolsComponentProps> = ({ schoolName, schoolAddress }) => {
    return (
            <Flex m={5} flex={1} flexBasis="45%" flexDir={"column"} align="center" justifyContent={"center"}>
                <Text color={"primary"} fontWeight="bold">{schoolName}</Text>
                <Text mt={"2"}>{schoolAddress}</Text>
            </Flex>
    );
};

export default MemberSchoolsComponent;