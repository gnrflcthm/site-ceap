import { FC } from "react";

import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { VStack, Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

import tempImage from "../../assets/CORE_logo.jpg";

const ResourceClassification: FC<{
    icon?: string | StaticImageData;
    classification?: string;
    href?: string;
}> = ({ icon = tempImage, classification, href="#" }) => {
    return (
        <Link href={href} passHref>
            <VStack
                align={"stretch"}
                as={motion.a}
                rounded={"md"}
                bg={"secondary"}
                color={"neutralizerLight"}
                w={"23%"}
                mb={"4"}
                whileHover={{
                    scale: 1.1,
                }}
            >
                <Box
                    position={"relative"}
                    w={"full"}
                    py={"20"}
                    alignSelf={"center"}
                    objectFit={"cover"}
                    borderTopRadius={"md"}
                    overflow={"hidden"}
                >
                    <Image src={icon} layout={"fill"} objectFit={"cover"} />
                </Box>
                <Text textAlign={"center"} fontWeight={"bold"}>
                    {classification}
                </Text>
            </VStack>
        </Link>
    );
};

export default ResourceClassification;
