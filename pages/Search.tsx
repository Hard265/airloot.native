import { Heading } from "@/components/Text";
import { HomeStackParamsList } from "@/Router";
import { useTheme } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { TextInput, View } from "react-native";

type props = NativeStackScreenProps<HomeStackParamsList, "Search">;

export default function Search({ navigation }: props) {
    const theme = useTheme();
    useEffect(() => {
        navigation.setOptions({
            headerTitle(props) {
                return (
                    <TextInput
                        placeholder="Search for files and folders"
                        placeholderClassName="text-primary"
                        placeholderTextColor={theme.colors.border}
                        className="w-3/4 border border-border px-4 font-[NeueMontreal-Medium] color-text focus:border-primary"
                    />
                );
            },
            headerTitleContainerStyle: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-start",
                width: "100%",
            },
        });
    }, []);
    return <Heading>Search</Heading>;
}
