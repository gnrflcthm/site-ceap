import {
    createContext,
    FC,
    PropsWithChildren,
    useEffect,
    useState,
} from "react";

import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import "../firebase/client";
import axios from "axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { validateUser } from "@util/api/validateUser";
import { useToast } from "@chakra-ui/react";

export interface CoreUser {
    uid?: string;
    displayName?: string;
    role: string;
}

export const AuthContext = createContext<{
    loading: boolean;
    user: CoreUser | null | undefined;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}>({
    loading: false,
    user: null,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [user, setUser] = useState<CoreUser | undefined>(undefined);
    const [loading, setLoading] = useState<boolean>(true);
    const client = useQueryClient();
    const { data } = useQuery<CoreUser | undefined>(["user"], validateUser, {
        retry: 2,
        staleTime: 1000 * 60 * 60 * 8,
        refetchInterval: 1000 * 60 * 60 * 5,
        onSettled: () => setLoading(false),
    });

    const auth = getAuth();
    const toast = useToast();

    const login = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email.trim(), password)
            .then(async ({ user }) => {
                const token = await user.getIdToken(true);
                await axios.head("/api/user/login", {
                    headers: {
                        Authorization: token,
                    },
                });
                client.refetchQueries(["user"]);
            })
            .finally(() => {
                signOut(auth);
            });
    };

    useEffect(() => {
        setUser(data);
        console.table(data);
    }, [data]);

    const logout = async () => {
        await axios.head("/api/user/logout");
        client.clear();
        setUser(undefined);
        toast({
            title: "You have successfully logged out.",
            status: "success",
        });
    };

    return (
        <AuthContext.Provider value={{ loading, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
