import { Text, TextInput, View } from "react-native";

interface InputProps {
    label: string;
    value?: string;
    onChange?(text: string): void;
}
export default function Input(props: InputProps) {
    return (
        <View className="flex flex-col gap-2 p-4">
            <Text className="text-lg color-text">{props.label}</Text>
            <TextInput
                value={props.value}
                onChangeText={props.onChange}
                className="border border-border px-4 text-base color-text focus:border-2 focus:border-primary"
            />
        </View>
    );
}
