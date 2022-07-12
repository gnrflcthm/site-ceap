import { FC } from "react";

import Image, { StaticImageData } from "next/image";

import { Box } from "@chakra-ui/react";

const PhotoItem: FC<{ image: string | StaticImageData }> = ({ image }) => {
    return (
        <Box
            objectFit={"contain"}
            position={"relative"}
            px={"32"}
            py={"20"}
            mb={"4"}
        >
            <Image src={image} layout={"fill"} objectFit={"cover"} />
        </Box>
    );
};

export default PhotoItem;
