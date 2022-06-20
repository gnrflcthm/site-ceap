import { FC } from "react";

import { Flex, Link, Text } from "@chakra-ui/react";

const Footer: FC = () => {
    return (
        <Flex
            justifyContent={"space-between"}
            alignItems={"center"}
            p={"8"}
            bg={"primary"}
            color={"textOnPrimary"}
        >
            <Link>Privacy Policy</Link>
            <Text>
                Copyright © 2017 Catholic Educational Association of the
                Philippines
            </Text>
        </Flex>
    );
};

export default Footer;
