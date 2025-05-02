import clsx from "clsx";
import { ReactNode } from "react";
import { Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

interface ListItemProps {
    icon?: ReactNode;
    title: string;
    subtitle?: string;
    trailing?: ReactNode | string;
    onPress?(): void;
    onLongPress?(): void;
}

export default function ListItem(props: ListItemProps) {
    return (
        <RectButton onPress={props.onPress} onLongPress={props.onLongPress}>
            <View className="flex flex-row items-center gap-4 p-4">
                <Text
                    className={clsx(
                        "color-text",
                        props.subtitle && "mt-1 self-start",
                    )}
                >
                    {props.icon}
                </Text>
                <View className="flex flex-1 flex-col">
                    <Text className="font-[NeueMontreal-Medium] text-lg color-text">
                        {props.title}
                    </Text>
                    {props.subtitle && (
                        <Text className="color-text/65">{props.subtitle}</Text>
                    )}
                </View>
                {props.trailing && (
                    <Text
                        className={clsx(
                            "font-[NeueMontreal-Regular] color-text/65",
                            props.subtitle && "self-end",
                        )}
                    >
                        {props.trailing}
                    </Text>
                )}
            </View>
        </RectButton>
    );
}
