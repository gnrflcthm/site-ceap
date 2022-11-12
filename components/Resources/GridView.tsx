import { Grid } from "@chakra-ui/react";

import { FC, PropsWithChildren } from "react";

const GridView: FC<PropsWithChildren & { columnTemplate?: any }> = ({
    children,
    columnTemplate,
}) => {
    return (
        <Grid
            w={"full"}
            h={"fit-content"}
            gridTemplateColumns={
                columnTemplate || {
                    base: "repeat(2, 1fr)",
                    md: "repeat(3, 1fr)",
                    xl: "repeat(4, 1fr)",
                }
            }
            justifyItems={"center"}
            alignItems={"start"}
            gap={"4"}
        >
            {children}
        </Grid>
    );
};

export default GridView;
