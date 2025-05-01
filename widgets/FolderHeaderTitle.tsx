import { TextProps, View } from "react-native";
import Animated from "react-native-reanimated";

interface FolderHeaderTitleProps {
    style: TextProps["style"];
    title: string;
}

export default function FolderHeaderTitle({
    style,
    title,
}: FolderHeaderTitleProps) {
    return (
        <View className="overflow-hidden">
            <Animated.Text
                className="translate-y-8 font-[NeueMontreal-Medium] text-2xl color-text"
                style={[style]}
            >
                {title}
            </Animated.Text>
        </View>
    );
}
