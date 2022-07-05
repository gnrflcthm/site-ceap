import { FC, MouseEventHandler } from "react";

import { Image, Box, Text, Flex, position } from "@chakra-ui/react";

interface ImageProps {
    src: string;
    name: string;
    position ?: string;
    description ?: string;
    location ?: string;

}

const MemberImage: FC<ImageProps> = ({ src, name, position, description, location }) => {
    return (
        <Flex flexDir='column' justifyContent='center' align='center' margin='2' height={'100%'} flexBasis= '30%'>
            <Text paddingTop={2} paddingBottom={2} fontWeight='bold' justifyContent='center' align='center'>{location}</Text>
            <Image height='100%' align='center' src={src} />
            <Text paddingTop={2} fontWeight='bold' justifyContent='center' align='center'>{name}</Text>
            <Text paddingTop={2} fontStyle='italic' justifyContent='center' align='center'>{position}</Text>
            <Text justifyContent='center' align='center'>{description}</Text>
        </Flex>
    );
};

export default MemberImage;
