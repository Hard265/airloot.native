import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps {
    label: string;
    value?: string;
    onChange?(text: string): void;
    autoFocus?: boolean;
    selectTextOnFocus?: boolean;
    secureTextEntry?: boolean;
    type?: TextInputProps["keyboardType"];
}
export default function Input(props: InputProps) {
    return (
        <View className="flex flex-col gap-2 p-4">
            <Text className="text-lg color-text">{props.label}</Text>
            <TextInput
                value={props.value}
                onChangeText={props.onChange}
                selectTextOnFocus={props.selectTextOnFocus}
                autoFocus={props.autoFocus}
                secureTextEntry={props.secureTextEntry}
                keyboardType={props.type}
                className="border-2 border-border px-4 text-base color-text focus:border-2 focus:border-primary"
            />
        </View>
    );
}
