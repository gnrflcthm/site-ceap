import {
    createContext,
    FC,
    PropsWithChildren,
    useEffect,
    useState,
} from "react";

import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import "../firebase/client";

type CoreUser = User | null;

export const AuthContext = createContext<CoreUser>(null);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState<CoreUser>(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {});
        return () => unsubscribe();
    }, []);
    return (
        <AuthContext.Provider value={currentUser}>
            {children}
        </AuthContext.Provider>
    );
};
