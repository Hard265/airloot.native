import useSession from "@/hooks/useSession";
import { HomeStackParamsList } from "@/Router";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import * as Crypto from "expo-crypto";
import { memoize } from "lodash";
import { observer } from "mobx-react-lite";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

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
    const { signOut } = useSession();
    // const session = useSession();
    // const [avatar, setAvatar] = useState({
    //     loading: false,
    //     uri: "",
    // });
    // const email = "hardynamakhwa@gmail.com";

    // useEffect(() => {
    //     setAvatar((v) => ({ ...v, loading: true }));
    //     (async () => {
    //         const hash = await getHash(email);
    //         setAvatar((v) => ({
    //             ...v,
    //             uri: `https://www.gravatar.com/avatar/${hash}?s=${96}&d=retro`,
    //         }));
    //     })().finally(() => {
    //         setAvatar((v) => ({ ...v, loading: false }));
    //     });
    // }, [email]);

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
                <View className="max-h-4/5 flex w-11/12 flex-col bg-secondary p-2">
                    <View className="flex flex-col gap-1 bg-background/25 p-4">
                        <View className="items-end justify-center">
                            <RectButton
                                borderless
                                onPress={() => navigation.navigate("Settings")}
                            >
                                <Feather
                                    name="settings"
                                    size={20}
                                    color={theme.colors.text}
                                />
                            </RectButton>
                        </View>
                        <View className="flex flex-row gap-4">
                            {/* {avatar.uri && (
                                <Animated.Image
                                    sharedTransitionTag="_avatar"
                                    source={{ uri: avatar.uri }}
                                    className="size-24"
                                />
                            )} */}
                            <View className="flex flex-1 flex-col gap-0.5">
                                <Text className="font-medium text-2xl color-text">
                                    Personal
                                </Text>
                                <Text
                                    numberOfLines={1}
                                    className="text-base color-text"
                                >
                                    hardynamakhwa@gmail.com
                                </Text>
                                <Text className="text-base text-green-500 dark:text-green-600">
                                    <Feather name="refresh-cw" /> Sync is on
                                </Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity onPress={() => signOut()}>
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
