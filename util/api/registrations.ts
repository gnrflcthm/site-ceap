import { UserRegistration } from "@prisma/client";
import { QueryFunction } from "@tanstack/react-query";
import axios from "axios";

export const getRegistrations: QueryFunction<UserRegistration[]> = async () => {
    return (
        await axios.post<{ registrations: UserRegistration[] }>(
            "/api/member/registrations",
            {}
        )
    ).data.registrations;
};
