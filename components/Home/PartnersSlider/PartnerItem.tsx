import { FC } from "react";

import Image from "next/image";

import { Flex, Link, Box } from "@chakra-ui/react";

export interface PartnerData {
    logo: string;
    alt?: string;
    href?: string;
}

const PartnerItem: FC<PartnerData> = ({ logo, alt, href }) => {
    return (
        <Link
            href={href || "/#"}
            display={"flex"}
            h={"40"}
            w={"full"}
            position={"relative"}
            justifyContent={"center"}
        >
            <Flex h={"40"} w={"40"} objectFit={"cover"} position={"relative"}>
                <Image
                    src={logo}
                    layout={"fill"}
                    objectFit={"cover"}
                    objectPosition={"center"}
                    alt={alt}
                />
            </Flex>
        </Link>
    );
};

export default PartnerItem;
