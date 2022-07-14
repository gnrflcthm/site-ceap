import {FC, PropsWithChildren} from 'react'

import { Text } from '@chakra-ui/react';

const Bold: FC<PropsWithChildren> = ({ children }) => (
    <Text fontWeight={"bold"} display={"inline"}>
        {children}
    </Text>
);

export default Bold;