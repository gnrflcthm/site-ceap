import {
    createContext,
    FC,
    PropsWithChildren,
    useEffect,
    useState,
} from "react";

import {
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    User,
} from "firebase/auth";
import "../firebase/client";
import { getAccountType } from "@util/functions";
import { AccountType } from "@prisma/client";
import axios from "axios";
import { StreamingQuerystring } from "formidable/parsers";

interface CoreUser {
    uid?: string;
    displayName?: string;
    role?: string;
}

export const AuthContext = createContext<{
    loading: boolean;
    user: CoreUser | null | undefined;
    role: string | undefined;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}>({
    loading: false,
    user: null,
    role: undefined,
    login: async () => {},
    logout: async () => {},
});

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<CoreUser | undefined | null>(
        undefined
    );
    const [loading, setLoading] = useState<boolean>(true);
    const [role, setRole] = useState<string | undefined>(undefined);

    const auth = getAuth();

    const login = async (email: string, password: string) => {
        return signInWithEmailAndPassword(auth, email, password)
            .then(async ({ user }) => {
                const token = await user.getIdToken(true);
                let { status: loginStatus } = await axios.head(
                    "/api/user/login",
                    {
                        headers: {
                            Authorization: token,
                        },
                    }
                );
                let { data, status: validationStatus } =
                    await axios.post<CoreUser>("/api/user/validate");
                setCurrentUser(data);
                setRole(getAccountType(data.role || ""));
                console.log("Login Status: ", loginStatus);
                console.log("Validation Status: ", validationStatus);
            })
            .finally(() => {
                signOut(auth);
            });
    };

    const logout = async () => {
        let { status } = await axios.head("/api/user/logout");
        setCurrentUser(null);
    };

    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                let { data } = await axios.post<CoreUser>("/api/user/validate");

                setCurrentUser(data);
                setRole(getAccountType(data.role || ""));
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <AuthContext.Provider
            value={{ loading, user: currentUser, role, login, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
};
