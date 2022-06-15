import { FC, ReactNode } from "react";

import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel,
    Box,
    VStack,
} from "@chakra-ui/react";

import MobileNavLink from "./MobileNavLink";

interface MobileDropdownProps {
    href: string;
    text: string;
    children?: ReactNode;
}

const MobileDropdown: FC<MobileDropdownProps> = ({ href, text, children }) => {
    return (
        <AccordionItem border={"none"}>
            <AccordionButton p={"0"} pr={"2"}>
                <Box flex={"1"}>
                    <MobileNavLink href={href} text={text} navigate={false} />
                </Box>
                <AccordionIcon />
            </AccordionButton>
            <AccordionPanel
                as={VStack}
                alignItems={"stretch"}
                spacing={"0"}
                p={"0"}
            >
                {children}
            </AccordionPanel>
        </AccordionItem>
    );
};

export default MobileDropdown;
