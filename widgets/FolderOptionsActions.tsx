import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { Text, View } from "react-native";
import rootStore from "@/stores/rootStore";

export default function FolderOptionsActions() {
    const { colors } = useTheme();

    return (
        <View className="flex flex-col">
            <RectButton
                onPress={() => rootStore.uiStore.clearContextMenuTarget()}
            >
                <View className="flex flex-row items-center gap-4 p-4">
                    <MaterialCommunityIcons
                        name="rename-box"
                        size={20}
                        color={colors.text}
                    />
                    <Text className="font-[NeueMontreal-Regular] text-lg color-text">
                        Rename
                    </Text>
                </View>
            </RectButton>
            <RectButton>
                <View className="flex flex-row items-center gap-4 p-4">
                    <Feather name="copy" size={20} color={colors.text} />
                    <Text className="font-[NeueMontreal-Regular] text-lg color-text">
                        Copy
                    </Text>
                </View>
            </RectButton>
            <RectButton>
                <View className="flex flex-row items-center gap-4 p-4">
                    <MaterialCommunityIcons
                        name="link-plus"
                        size={24}
                        color={colors.text}
                    />
                    <Text className="font-[NeueMontreal-Regular] text-lg color-text">
                        Create link
                    </Text>
                </View>
            </RectButton>
            <RectButton>
                <View className="flex flex-row items-center gap-4 p-4">
                    <Feather name="download" size={20} color={colors.text} />
                    <Text className="font-[NeueMontreal-Regular] text-lg color-text">
                        Save to device
                    </Text>
                </View>
            </RectButton>
            <RectButton>
                <View className="flex flex-row items-center gap-4 p-4">
                    <Feather name="trash-2" size={20} color={colors.text} />
                    <Text className="font-[NeueMontreal-Regular] text-lg color-text">
                        Permanently delete
                    </Text>
                </View>
            </RectButton>
        </View>
    );
}
