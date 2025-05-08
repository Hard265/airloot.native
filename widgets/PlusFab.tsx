import { usePlusOptions } from "@/hooks/usePlusOptions";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export default function PlusFab() {
    const { colors } = useTheme();
    const { show } = usePlusOptions();

    return (
        <View className="absolute bottom-6 right-6">
            <RectButton onPress={() => show()}>
                <View className="bg-primary p-4 shadow">
                    <Feather name="plus" size={24} color={colors.text} />
                </View>
            </RectButton>
        </View>
    );
}
