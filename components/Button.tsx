import { PropsWithChildren } from "react";
import { Pressable, Text } from "react-native";

interface ButtonProps extends PropsWithChildren {
    onPress?(): void;
}

export default function Button(props: ButtonProps) {
    return (
        <Pressable
            onPress={props.onPress}
            className="bg-primary flex flex-row items-center justify-center p-3"
        >
            <Text className="color-text text-base font-medium">
                {props.children}
            </Text>
        </Pressable>
    );
}
