import { Text, TextInput, View } from "react-native";

interface InputProps {
    label: string;
    value?: string;
    onChange?(text: string): void;
}
export default function Input(props: InputProps) {
    return (
        <View className="flex flex-col gap-2 p-4">
            <Text className="color-text text-base">{props.label}</Text>
            <TextInput
                value={props.value}
                onChangeText={props.onChange}
                className="focus:border-primary border-border color-text border px-4 text-base focus:border-2"
            />
        </View>
    );
}
