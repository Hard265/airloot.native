import { useTheme } from "@react-navigation/native";
import { useState } from "react";
import { TextInput } from "react-native";

export default function HomeSearchbox() {
    const { colors } = useTheme();
    const [query, setQuery] = useState("");
    return (
        <TextInput
            value={query}
            onChangeText={setQuery}
            focusable
            placeholder="Search..."
            placeholderTextColor={colors.border}
            multiline={false}
            className="h-12 flex-1 border-2 border-text/25 px-2 font-[NeueMontreal-Medium] color-text focus:border-primary"
        />
    );
}
