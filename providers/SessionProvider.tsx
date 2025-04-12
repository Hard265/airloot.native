import { createContext, PropsWithChildren, useState } from "react";

type sessionContextProps = {
    token: {
        access: string;
        refresh: string;
    } | null;
    signIn(credintials: { email: string; password: string }): Promise<void>;
    isAuthenticated: boolean;
};

export const SessionContext = createContext<sessionContextProps>({
    token: null,
    async signIn() {},
    isAuthenticated: false,
});

export default function SessionProvider(props: PropsWithChildren) {
    const [token, setToken] = useState<sessionContextProps["token"]>(null);

    const signIn = async (credintials: { email: string; password: string }) => {
        setToken({ access: "token", refresh: "token" });
    };

    return (
        <SessionContext.Provider
            value={{
                token,
                signIn,
                isAuthenticated: token ? true : false,
            }}
        >
            {props.children}
        </SessionContext.Provider>
    );
}
