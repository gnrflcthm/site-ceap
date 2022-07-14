import { FC, MouseEventHandler } from "react";

import { Button, Text, Box, Tooltip, Link, CSSObject } from "@chakra-ui/react";

import { BsChevronRight, BsDownload } from "react-icons/bs";

interface PanelItemProps {
    text: string;
    onClick?: MouseEventHandler;
    isDownload?: boolean;
    downloadURL?: string;
}

const PanelItem: FC<PanelItemProps> = ({
    text,
    onClick,
    isDownload,
    downloadURL = "#",
}) => {
    const downloadItem = () => {
        let link = document.createElement("a");
        link.href = downloadURL;
        link.download = text;
        link.click();
    };

    return (
        <Tooltip label={text} placement={"top"} hasArrow>
            <Button
                onClick={isDownload ? downloadItem : onClick}
                display={"flex"}
                justifyContent={"space-between"}
                alignItems={"center"}
                w={"full"}
                rounded={"none"}
            >
                <Text
                    flex={"1"}
                    textAlign={"start"}
                    textOverflow={"ellipsis"}
                    whiteSpace={"nowrap"}
                    overflow={"hidden"}
                >
                    {text}
                </Text>
                <Box as={isDownload ? BsDownload : BsChevronRight} />
            </Button>
        </Tooltip>
    );
};

export default PanelItem;
