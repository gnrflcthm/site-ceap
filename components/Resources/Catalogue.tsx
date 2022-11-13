import { FC } from "react";

import { Grid } from "@chakra-ui/react";
import Category from "./Category";
import { Classifications } from "@util/helper";

const Catalogue: FC = () => {
    return (
        <Grid
            pos={"relative"}
            gridTemplateColumns={{
                base: "repeat(1, minmax(0, 1fr))",
                md: "repeat(3, minmax(0, 1fr))",
            }}
            gridAutoRows={"1fr"}
            gap={"10"}
            px={{ base: "8", lg: "24" }}
        >
            {Object.keys(Classifications).map((classification) => (
                <Category
                    classification={classification}
                    key={classification}
                />
            ))}
        </Grid>
    );
};

export default Catalogue;
