import { StaticImageData } from "next/image";
import { FC } from "react";

import Image from "next/image";

import { Box } from "@chakra-ui/react";

const VideoItem: FC<{
    thumbnail: string | StaticImageData;
    href?: string;
}> = ({ thumbnail, href }) => {
    return (
        <Box
            position={"relative"}
            objectFit={"contain"}
            px={"32"}
            py={"20"}
            mx={"4"}
            bg={thumbnail ? "none" : "whiteAlpha.300"}
        >
            {thumbnail && (
                <Image src={thumbnail} layout={"fill"} objectFit={"cover"} />
            )}
        </Box>
    );
};

export default VideoItem;
