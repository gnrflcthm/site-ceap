import axios from "axios";
import type { QueryFunction } from "@tanstack/react-query";
import { CoreUser } from "@context/AuthContext";

const validateUser: QueryFunction<CoreUser | undefined> = async () => {
    try {
        return (await axios.post<CoreUser>("/api/user/revalidate")).data;
    } catch (err) {
        console.debug(err);
        return undefined;
    }
};

export { validateUser };
