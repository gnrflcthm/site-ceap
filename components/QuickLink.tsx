import { FC, PropsWithChildren } from "react";

import NextLink from "next/link";
import { Box } from "@chakra-ui/react";

interface QuickLinkProps extends PropsWithChildren {
    href?: string;
}

const QuickLink: FC<QuickLinkProps> = ({ href = "/", children }) => {
    return (
        <NextLink href={href} passHref>
            <Box as={"a"} pl={"8"} py={"2"} _hover={{ bg: "whiteAlpha.200" }}>
                {children}
            </Box>
        </NextLink>
    );
};

export default QuickLink;
