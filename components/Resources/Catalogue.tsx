import { FC } from "react";

import { VStack, SimpleGrid, Heading } from "@chakra-ui/react";
import Category from "./Category";

const Catalogue: FC = () => {
    return (
        <VStack py={"10"} spacing={"8"}>
            <Heading>Catalog</Heading>
            <SimpleGrid columns={4} gap={"8"}>
                <Category href={"/"} name={"Christian Formation"} resourceCount={105} />
                <Category href={"/"} name={"Basic Education"} resourceCount={420} />
                <Category href={"/"} name={"Higher Education"} resourceCount={1095} />
            </SimpleGrid>
        </VStack>
    );
};

export default Catalogue;
