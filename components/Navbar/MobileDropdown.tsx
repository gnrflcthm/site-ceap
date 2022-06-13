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
        <Accordion allowMultiple={true} allowToggle={true} p={0}>
            <AccordionItem border={"none"}>
                <AccordionButton>
                    <Box flex={"1"}>
                        <MobileNavLink
                            href={href}
                            text={text}
                            navigate={false}
                        />
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
        </Accordion>
    );
};

export default MobileDropdown;
