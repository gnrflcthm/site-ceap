import { FC, PropsWithChildren } from "react";

import Navbar from "./Navbar/Navbar";

const Layout: FC<PropsWithChildren> = ({ children }) => {
    return (
        <>
            <Navbar />
            {children}
        </>
    );
};

export default Layout;
