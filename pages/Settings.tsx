import useSession from "@/hooks/useSession";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
    const theme = useTheme();
    const { signOut } = useSession();
    return (
        <ScrollView>
            <TouchableOpacity onPress={() => signOut()}>
                <View
                    accessible
                    accessibilityRole="button"
                    className="flex flex-row items-center gap-4 p-4"
                >
                    <Feather
                        name="log-out"
                        size={20}
                        color={theme.colors.text}
                    />
                    <Text className="text-lg color-text">Sign Out</Text>
                </View>
            </TouchableOpacity>
        </ScrollView>
    );
}
