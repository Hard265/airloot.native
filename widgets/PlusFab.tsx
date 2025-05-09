import { usePlusOptions } from "@/hooks/usePlusOptions";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import colors from "tailwindcss/colors";

export default function PlusFab() {
    const { show } = usePlusOptions();

    return (
        <View className="absolute bottom-6 right-6">
            <RectButton onPress={() => show()}>
                <View className="bg-primary p-4 shadow-sm shadow-text">
                    <Feather name="plus" size={24} color={colors.white} />
                </View>
            </RectButton>
        </View>
    );
}
