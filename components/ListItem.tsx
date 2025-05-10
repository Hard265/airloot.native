import clsx from "clsx";
import { ReactNode, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

interface ListItemProps {
    icon?: ReactNode;
    title: string;
    editing?: boolean;
    onBlur?: () => void;
    onSubmit?(name: string): void;
    selected?: boolean;
    subtitle?: string;
    trailing?: ReactNode | string;
    onPress?(): void;
    onLongPress?(): void;
}

export default function ListItem(props: ListItemProps) {
    const [input, setInput] = useState(props.title);

    return (
        <RectButton onPress={props.onPress} onLongPress={props.onLongPress}>
            <View
                className={clsx(
                    "flex flex-row items-center gap-4 p-4",
                    props.selected && "bg-primary/10",
                )}
            >
                <Text
                    className={clsx(
                        "color-text",
                        props.subtitle && "mt-1 self-start",
                    )}
                >
                    {props.icon}
                </Text>
                <View className="flex flex-1">
                    {props.editing ? (
                        <TextInput
                            value={input}
                            onChangeText={setInput}
                            autoFocus
                            selectTextOnFocus
                            onSubmitEditing={() =>
                                props.onSubmit && props.onSubmit(input)
                            }
                            onBlur={props.onBlur}
                            className="border border-border p-2 py-1 font-[NeueMontreal-Regular] text-lg color-text focus:border-2 focus:border-primary"
                        />
                    ) : (
                        <Text
                            numberOfLines={1}
                            ellipsizeMode="middle"
                            className="font-[NeueMontreal-Medium] text-lg color-text"
                        >
                            {props.title}
                        </Text>
                    )}
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
