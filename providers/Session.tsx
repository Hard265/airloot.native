import api from "@/services/api";
import * as SecureStore from "expo-secure-store";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

export type Credentials = {
    email: string;
    password: string;
};

type SessionContextType = {
    authenticated: boolean;
    signOut(): Promise<void>;
    resetPassword(email: string): Promise<void>;
    signIn(credentials: Credentials): Promise<void>;
    signUp(credentials: Credentials): Promise<void>;
};

export const SessionContext = createContext<SessionContextType>({
    authenticated: false,
    signOut: function (): Promise<void> {
        throw new Error("Function not implemented.");
    },
    signIn: function (credentials: Credentials): Promise<void> {
        throw new Error("Function not implemented.");
    },
    signUp: function (credentials: Credentials): Promise<void> {
        throw new Error("Function not implemented.");
    },
    resetPassword: function (email: string): Promise<void> {
        throw new Error("Function not implemented.");
    },
});

export default function Session({ children }: PropsWithChildren) {
    const [isLoading, setIsLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        (async () => {
            try {
                setAuthenticated(!!(await getToken()));
            } finally {
                setIsLoading(false);
            }
        })();
    }, []);

    if (isLoading) return null;

    const signIn = async (credentials: Credentials) => {
        const { data } = await api.post("/token/", {
            email: credentials.email,
            password: credentials.password,
        });
        setToken(data);
        setAuthenticated(true);
    };

    const signUp = async (credentials: Credentials) => {
        const { data } = await api.post("/register/", {
            email: credentials.email,
            password: credentials.password,
        });
        await setToken(data.token);
        setAuthenticated(true);
    };

    const signOut = async () => {
        await deleteToken();
        setAuthenticated(false);
    };

    const resetPassword = async (email: string) => {
        const { data } = await api.post("/password-reset/", { email });
        return data;
    };

    return (
        <SessionContext.Provider
            value={{ authenticated, resetPassword, signIn, signOut, signUp }}
        >
            {children}
        </SessionContext.Provider>
    );
}

async function getToken(): Promise<string | null> {
    return await SecureStore.getItemAsync("token");
}

function setToken(token: object): Promise<void> {
    return SecureStore.setItemAsync("token", JSON.stringify(token));
}
function deleteToken() {
    return SecureStore.deleteItemAsync("token", {
        requireAuthentication: true,
    });
}
