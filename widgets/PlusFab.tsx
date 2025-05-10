import useFolderOptions from "@/hooks/useFolderOptions";
import { usePlusOptions } from "@/hooks/usePlusOptions";
import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, { FadeInDown, FadeOutDown } from "react-native-reanimated";
import colors from "tailwindcss/colors";

export default function PlusFab() {
    const { show } = usePlusOptions();
    const { isBottomSheetVisible } = useFolderOptions();

    return (
        !isBottomSheetVisible && (
            <Animated.View
                entering={FadeInDown.duration(150)}
                exiting={FadeOutDown}
                className="absolute bottom-6 right-6"
            >
                <RectButton onPress={() => show()}>
                    <View className="rounded-2xl bg-primary p-5 shadow-sm shadow-text">
                        <Feather name="plus" size={24} color={colors.white} />
                    </View>
                </RectButton>
            </Animated.View>
        )
    );
}
