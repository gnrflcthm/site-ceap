import { FC } from "react";
import Image, { StaticImageData } from "next/image";
import { Flex, Box } from "@chakra-ui/react";

const CoreValueObject: FC<{ icon: string | StaticImageData }> = ({ icon }) => {
    return (
        <Flex
            justifyContent={"center"}
            alignItems={"stretch"}
            position={"relative"}
            flexBasis={"30%"}
            h={"full"}
            w={"full"}
            my={"4"}
        >
            <Box
                position={"relative"}
                p={"20"}
                bg={"white"}
                rounded={"md"}
            >
                <Image src={icon} layout={"fill"} objectFit={"contain"} />
            </Box>
        </Flex>
    );
};

export default CoreValueObject;
