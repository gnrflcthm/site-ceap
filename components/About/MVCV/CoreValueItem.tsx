import { FC } from "react";

import Image, { StaticImageData } from "next/image";

import { Box } from "@chakra-ui/react";

const CoreValueItem: FC<{ src: string | StaticImageData }> = ({ src }) => {
    return (
        <Box position={"relative"} objectFit={"cover"} p={"20"}>
            <Box
                position={"absolute"}
                w={"full"}
                h={"full"}
                top={"0"}
                left={"0"}
                bg={"primary"}
                opacity={"0.9"}
            />
            <Image src={src} layout={"fill"} objectFit={"contain"} />
        </Box>
    );
};

export default CoreValueItem;
