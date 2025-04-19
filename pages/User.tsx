import { IconButton } from "@/components/Button";
import useSession from "@/hooks/useSession";
import { HomeStackParamsList } from "@/Router";
import userStore from "@/stores/userStore";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import * as Crypto from "expo-crypto";
import { memoize } from "lodash";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Image, Modal, Text, TouchableOpacity, View } from "react-native";

type navigationProp = StackScreenProps<HomeStackParamsList, "User">;

const getHash = memoize(async (email: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    return await Crypto.digestStringAsync(
        Crypto.CryptoDigestAlgorithm.SHA256,
        normalizedEmail,
        {
            encoding: Crypto.CryptoEncoding.HEX,
        },
    );
});

function User({ navigation }: navigationProp) {
    const theme = useTheme();
    const session = useSession();
    const [avatar, setAvatar] = useState({
        loading: false,
        uri: "",
    });
    const email = userStore.email || "";

    useEffect(() => {
        userStore.setup();
    }, []);

    useEffect(() => {
        setAvatar((v) => ({ ...v, loading: true }));
        (async () => {
            const hash = await getHash(email);
            setAvatar((v) => ({
                ...v,
                uri: `https://www.gravatar.com/avatar/${hash}?s=${96}&d=retro`,
            }));
        })().finally(() => {
            setAvatar((v) => ({ ...v, loading: false }));
        });
    }, [email]);

    return (
        <Modal
            transparent
            onRequestClose={() => {
                navigation.canGoBack() && navigation.goBack();
            }}
            onDismiss={() => {
                navigation.canGoBack() && navigation.goBack();
            }}
        >
            <View className="flex-1 items-center justify-center bg-black/50">
                <View className="max-h-4/5 flex w-11/12 flex-col rounded-xl bg-secondary p-2">
                    <View className="flex flex-row gap-4 rounded-xl bg-background/25 p-4">
                        {avatar.uri && (
                            <Image
                                source={{ uri: avatar.uri }}
                                className="size-24 rounded-full"
                            />
                        )}
                        <View className="flex flex-1 flex-col gap-0.5">
                            <Text className="text-2xl font-medium color-text">
                                Personal
                            </Text>
                            <Text className="text-base color-text">
                                {email}
                            </Text>
                            <Text className="text-base text-green-500 dark:text-green-600">
                                <Feather name="refresh-cw" /> Sync is on
                            </Text>
                        </View>
                        <View className="-mr-2 -mt-2 self-start">
                            <IconButton>
                                <Feather name="settings" size={20} />
                            </IconButton>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => session.signOut()}>
                        <View
                            accessible
                            accessibilityRole="button"
                            className="flex flex-row items-center gap-4 p-4"
                        >
                            <Feather
                                name="log-out"
                                size={20}
                                color={theme.colors.text}
                            />
                            <Text className="text-lg color-text">Sign Out</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

export default observer(User);
