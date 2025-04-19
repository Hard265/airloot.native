import api, { deleteToken, getToken, setToken } from "@/services/api";
import { runInAction } from "mobx";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import colors from "tailwindcss/colors";

type sessionContextProps = {
    signIn(credintials: { email: string; password: string }): Promise<void>;
    signOut(): Promise<void>;
    isAuthenticated: boolean;
};

export const SessionContext = createContext<sessionContextProps>({
    async signIn() {},
    async signOut() {},
    isAuthenticated: false,
});

export default function SessionProvider(props: PropsWithChildren) {
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        setLoading(true);
        (async () => {
            const token = await getToken();
            runInAction(() => {
                setIsAuthenticated(!!token);
                setLoading(false);
            });
        })();
    }, []);

    const signIn = async ({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) => {
        try {
            const { data } = await api.post("/token/", { email, password });
            await setToken({ ...data });
            setIsAuthenticated(true);
        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        }
    };

    const signOut = async () => {
        await deleteToken();
        setIsAuthenticated(false);
    };

    return (
        <SessionContext.Provider
            value={{
                signIn,
                signOut,
                isAuthenticated,
            }}
        >
            {loading ? (
                <View className="flex-1 items-center justify-center bg-background">
                    <ActivityIndicator
                        size="large"
                        color={colors.indigo[500]}
                    />
                </View>
            ) : (
                props.children
            )}
        </SessionContext.Provider>
    );
}
