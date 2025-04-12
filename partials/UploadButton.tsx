import { Text } from "react-native";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

export default function UploadButton() {
    return (
        <Animated.View className="absolute bottom-6 right-6">
            <RectButton>
                <View className="">
                    <Text></Text>
                </View>
            </RectButton>
        </Animated.View>
    );
}
