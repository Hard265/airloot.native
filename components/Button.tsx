import { useTheme } from "@react-navigation/native";
import clsx from "clsx";
import { PropsWithChildren } from "react";
import { ActivityIndicator, View , Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";

interface ButtonProps extends PropsWithChildren {
    loading?: boolean;
    disabled?: boolean;
    onPress?(): void;
}

export default function Button(props: ButtonProps) {
    const theme = useTheme();
    return (
        <RectButton
            onPress={props.onPress}
            enabled={!props.disabled && !props.loading}
        >
            <View
                className={clsx(
                    "flex flex-row items-center justify-center bg-primary p-3",
                    (props.disabled || props.loading) && "opacity-50",
                )}
            >
                {props.loading && (
                    <ActivityIndicator
                        className="mr-2"
                        size="small"
                        color={theme.colors.text}
                    />
                )}
                <Text className="font-[NeueMontreal-Medium] text-base color-text">
                    {props.children}
                </Text>
            </View>
        </RectButton>
    );
}

export function IconButton(props: ButtonProps) {
    return (
        <RectButton
            onPress={props.onPress}
            enabled={!props.disabled && !props.loading}
        >
            <View
                className={clsx(
                    "flex items-center justify-center p-3",
                    (props.disabled || props.loading) && "opacity-50",
                )}
            >
                <Text className="color-text">{props.children}</Text>
            </View>
        </RectButton>
    );
}

export function TextButton(props: ButtonProps) {
    const theme = useTheme();
    return (
        <RectButton
            onPress={props.onPress}
            enabled={!props.disabled && !props.loading}
        >
            <View
                className={clsx(
                    "flex flex-row items-center justify-center p-2",
                    (props.disabled || props.loading) && "opacity-50",
                )}
            >
                {props.loading && (
                    <ActivityIndicator
                        className="mr-2"
                        size="small"
                        color={theme.colors.text}
                    />
                )}
                <Text className="font-[NeueMontreal-Medium] text-base color-primary">
                    {props.children}
                </Text>
            </View>
        </RectButton>
    );
}
