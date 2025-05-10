import { extractFileExtension, getFileIcon } from "@/utils/fileIcons";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export default function Pinned() {
    const { colors } = useTheme();

    return (
        <View className="mb-4">
            <View className="flex flex-row items-center justify-between px-4">
                <Text className="h3">Pinned</Text>
            </View>
            <View className="flex flex-col">
                {Array(2)
                    .fill({
                        id: "1",
                        name: "hashes.txt",
                        size: 455670,
                    })

                    .map((i, index) => (
                        <RectButton key={index}>
                            <View className="flex flex-row items-center justify-start gap-4 p-2 px-4">
                                <MaterialCommunityIcons
                                    name={getFileIcon(
                                        extractFileExtension(i.name),
                                    )}
                                    size={20}
                                    color={colors.text}
                                />
                                <Text className="font-[NeueMontreal-Medium] text-lg text-text">
                                    {i.name}
                                </Text>
                            </View>
                        </RectButton>
                    ))}
            </View>
        </View>
    );
}
