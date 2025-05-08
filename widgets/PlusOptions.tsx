import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export default function PlusOptions() {
    const { colors } = useTheme();
    return (
        <View className="row flex-wrap justify-around p-4">
            <RectButton>
                <View className="col items-center p-4">
                    <Feather name="folder-plus" size={24} color={colors.text} />
                    <Text className="font-[NeueMontreal-Medium] color-text">
                        Folder
                    </Text>
                </View>
            </RectButton>
            <RectButton>
                <View className="col items-center p-4">
                    <Feather name="file-plus" size={24} color={colors.text} />
                    <Text className="font-[NeueMontreal-Medium] color-text">
                        File
                    </Text>
                </View>
            </RectButton>
            <RectButton>
                <View className="col items-center p-4">
                    <Feather name="upload" size={24} color={colors.text} />
                    <Text className="font-[NeueMontreal-Medium] color-text">
                        Upload
                    </Text>
                </View>
            </RectButton>
            <RectButton>
                <View className="col items-center p-4">
                    <Feather name="camera" size={24} color={colors.text} />
                    <Text className="font-[NeueMontreal-Medium] color-text">
                        Camera
                    </Text>
                </View>
            </RectButton>
        </View>
    );
}
