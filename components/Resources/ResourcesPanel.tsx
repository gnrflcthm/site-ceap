import { FC } from "react";

import { Flex, Heading, VStack } from "@chakra-ui/react";

import PanelItem from "./PanelItem";

interface ResourcesPanelProps {
    currentSubGroup: string;
}

const ResourcesPanel: FC<ResourcesPanelProps> = ({ currentSubGroup }) => {
    return (
        <Flex flexBasis={"33%"} bg={"pink.300"} flexDir={"column"} py={"4"}>
            <Heading>Available Resources</Heading>
            {currentSubGroup !== "" && (
                <VStack spacing={"0"}>
                    <PanelItem
                        isDownload
                        text="Capstone_Hax_autopass.apk.pdf.leg8.22o"
                    />
                </VStack>
            )}
        </Flex>
    );
};

export default ResourcesPanel;
