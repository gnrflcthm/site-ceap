import { FC, useState } from "react";

import Link from "next/link";

import { Flex, Box, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { motion } from "framer-motion";

interface QuickLinkProps {
    content: string;
    imgIcon: IconType;
    href: string;
}

const QuickLink: FC<QuickLinkProps> = ({ content, imgIcon, href }) => {
    const [hovered, setHovered] = useState<boolean>(false);
    return (
        <Link href={href}>
            <Box
                flex={"1"}
                transform={"auto"}
                scale={hovered ? "1.1" : "1"}
                cursor={"pointer"}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                transition={'all 0.2s ease'}
            >
                <Flex justify={"center"} w={"full"} h={"20"} mb={"4"}>
                    <Box
                        as={imgIcon}
                        h={"full"}
                        w={"full"}
                        mx={"auto"}
                        display={"block"}
                        color={hovered ? "secondary" : "neutralizerLight"}
                    />
                </Flex>
                <Text
                    color={"secondary"}
                    fontWeight={"bold"}
                    textAlign={"center"}
                >
                    {content}
                </Text>
            </Box>
        </Link>
    );
};

export default QuickLink;
