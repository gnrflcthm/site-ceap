import { FC, PropsWithChildren } from "react";

import { Text } from "@chakra-ui/react";

const Bold: FC<PropsWithChildren> = ({ children }) => (
    <Text as={"span"} fontWeight={"bold"} display={"inline"}>
        {children}
    </Text>
);

export default Bold;
