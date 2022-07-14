import { FC } from "react";

import { CircularProgress, Flex, Heading, VStack } from "@chakra-ui/react";

import PanelItem from "./PanelItem";

export type AvailableResources = Array<{
    filename: string;
    downloadURL: string;
}>;

interface ResourcesPanelProps {
    resources: AvailableResources;
    isLoading: boolean;
    currentSubGroup: string;
}

const ResourcesPanel: FC<ResourcesPanelProps> = ({
    resources = [],
    isLoading,
    currentSubGroup,
}) => {
    return (
        <Flex
            justifyContent={"flex-start"}
            alignItems={"stretch"}
            flexDir={"column"}
            w={"33%"}
            py={"4"}
            maxH={"100vh"}
            minH={"100vh"}
            overflowX={"hidden"}
            overscrollY={"auto"}
        >
            <Heading textAlign={"center"} my={"4"}>
                Available Resources
            </Heading>
            <VStack spacing={"0"} flex={"1"} justifyContent={isLoading ? "center" : "flex-start"}>
                {isLoading ? (
                    <CircularProgress isIndeterminate />
                ) : currentSubGroup !== "" ? (
                    resources.map(({ filename, downloadURL }, idx) => (
                        <PanelItem
                            key={idx}
                            text={filename}
                            downloadURL={downloadURL}
                            isDownload
                        />
                    ))
                ) : (
                    ""
                )}
            </VStack>
        </Flex>
    );
};

export default ResourcesPanel;
