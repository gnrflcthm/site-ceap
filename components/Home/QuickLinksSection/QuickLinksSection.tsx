import { FC } from "react";

import { Flex, Box, Heading, VStack } from "@chakra-ui/react";
import {
    FaSchool,
    FaGraduationCap,
    FaFileAlt,
    FaClipboardCheck,
} from "react-icons/fa";
import { BsFillGearFill } from "react-icons/bs";

import HomeSectionLabel from "../HomeSectionLabel";
import QuickLink from "./QuickLink";

const QuickLinksSection: FC = () => {
    return (
        <VStack
            justify={"space-around"}
            align={"center"}
            bg={"primary"}
            spacing={"8"}
            px={"10"}
            py={"10"}
            position={"relative"}
            overflow={"hidden"}
        >
            <HomeSectionLabel label={"Quick Links"} />
            <Flex
                justifyContent={"space-between"}
                alignItems={"center"}
                w={"full"}
                zIndex={"2"}
            >
                <QuickLink
                    content={"Member Schools"}
                    href={"/"}
                    imgIcon={FaSchool}
                />
                <QuickLink
                    content={"Education"}
                    href={"/"}
                    imgIcon={FaGraduationCap}
                />
                <QuickLink
                    content={"CEAP USIS"}
                    href={"/"}
                    imgIcon={BsFillGearFill}
                />
                <QuickLink
                    content={"Registration"}
                    href={"/"}
                    imgIcon={FaClipboardCheck}
                />
                <QuickLink
                    content={"Resources"}
                    href={"/"}
                    imgIcon={FaFileAlt}
                />
            </Flex>
            <Box
                bg={"whiteAlpha.400"}
                position={"absolute"}
                top={"0"}
                left={"0"}
                w={"full"}
                h={"full"}
                transform={"auto"}
                transformOrigin={"center"}
                rotate={"-20deg"}
                scaleX={"1.1"}
            />
        </VStack>
    );
};

export default QuickLinksSection;
