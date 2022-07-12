import { FC, useState } from "react";

import { Box, Flex, Heading, IconButton, Text, VStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from "@chakra-ui/react";

import { AnimatePresence, motion } from "framer-motion";

import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

import StrategicDirectionNav from "./StrategicDirectionNav";


const StrategicDirectionDisplay: FC = () => {
    return (
        <StrategicDirectionNav></StrategicDirectionNav>
    );
};

export default StrategicDirectionDisplay;
