import { MaterialCommunityIcons } from "@expo/vector-icons";
import clsx from "clsx";
import { isEmpty, upperFirst } from "lodash";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface InputProps {
    label: string;
    value?: string;
    onChange?(text: string): void;
    autoFocus?: boolean;
    selectTextOnFocus?: boolean;
    secureTextEntry?: boolean;
    errors?: string[];
    type?: TextInputProps["keyboardType"];
}
export default function Input(props: InputProps) {
    return (
        <View className="flex flex-col gap-2 p-4">
            <Text className="label">{props.label}</Text>
            <TextInput
                value={props.value}
                onChangeText={props.onChange}
                selectTextOnFocus={props.selectTextOnFocus}
                autoFocus={props.autoFocus}
                secureTextEntry={props.secureTextEntry}
                keyboardType={props.type}
                className={clsx(
                    "border-2 border-border/65 px-3 font-[NeueMontreal-Medium] text-base color-text focus:border-primary",
                    !isEmpty(props.errors) && "border-2 border-error",
                )}
            />
            {!isEmpty(props.errors) &&
                props.errors?.map((error, i) => (
                    <View key={i} className="flex flex-row items-start gap-0.5">
                        <Text className="text-error">
                            <MaterialCommunityIcons
                                name="circle-medium"
                                size={18}
                            />
                        </Text>
                        <Text className="p flex-1 text-error">
                            {upperFirst(error)}
                        </Text>
                    </View>
                ))}
        </View>
    );
}
