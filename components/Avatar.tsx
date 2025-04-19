import { Image, View } from "react-native";
import * as Crypto from "expo-crypto";
import { memoize } from "lodash";
import { useEffect, useState } from "react";
import { RectButton } from "react-native-gesture-handler";

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

interface AvatarProps {
    email: string;
    size?: number;
    onPress?(): void;
}

export default function Avatar({ email, onPress, size = 80 }: AvatarProps) {
    const [url, setUrl] = useState("");

    useEffect(() => {
        (async () => {
            setUrl(
                `https://www.gravatar.com/avatar/${await getHash(email)}?s=${96}&d=retro`,
            );
        })();
    }, [email, size]);
    return (
        <RectButton onPress={onPress}>
            <View className="ml-4 size-12 bg-primary">
                {url && (
                    <Image
                        source={{ uri: url }}
                        className="h-full w-full rounded-full"
                    />
                )}
            </View>
        </RectButton>
    );
}
