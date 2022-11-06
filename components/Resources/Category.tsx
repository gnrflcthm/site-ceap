import { FC } from "react";

import Link from "next/link";

import { Center, Text, useToken } from "@chakra-ui/react";
import { Classifications } from "@util/helper";

const Category: FC<{
    classification: string;
}> = ({ classification }) => {
    const [secondary] = useToken("colors", ["secondary"]);

    return (
        <Link
            href={`/resources/classification/${encodeURIComponent(
                classification.toLowerCase()
            )}`}
            passHref
        >
            <Center
                as={"a"}
                key={classification}
                rounded={"md"}
                p={"8"}
                bg={"secondary"}
                shadow={"md"}
                transform={"auto"}
                transition={"all 0.2s ease"}
                _hover={{
                    bg: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)) ${secondary}`,
                    scale: 1.1,
                }}
            >
                <Text
                    textAlign={"center"}
                    color={"neutralizerDark"}
                    fontWeight={"bold"}
                    fontSize={"xl"}
                >
                    {
                        Classifications[
                            classification as keyof typeof Classifications
                        ]
                    }
                </Text>
            </Center>
        </Link>
    );
};

export default Category;
