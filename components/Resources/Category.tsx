import { FC } from "react";

import Link from "next/link";

import { Box, Heading, Text } from "@chakra-ui/react";

import { motion } from "framer-motion";

const Category: FC<{
    resourceCount?: number;
    name?: string;
    href: string;
}> = ({ resourceCount, name, href }) => {
    return (
        <Link href={href} passHref>
            <Box
                as={motion.a}
                bg={"secondary"}
                rounded={"sm"}
                p={"4"}
                textAlign={"center"}
                whileHover={{
                    scale: 1.05,
                }}
                _hover={{
                    shadow: "md",
                }}
                shadow={"sm"}
            >
                <Heading fontWeight={"semibold"} fontSize={"2xl"}>
                    {name}
                </Heading>
                {resourceCount && <Text>{resourceCount} Files</Text>}
            </Box>
        </Link>
    );
};

export default Category;
