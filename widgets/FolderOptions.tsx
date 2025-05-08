import useFolderOptions from "@/hooks/useFolderOptions";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import dayjs from "dayjs";
import { Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export default function FolderOptions() {
    const { colors } = useTheme();
    const { selectedItem, closeBottomSheet } = useFolderOptions();

    const datestamp = dayjs(selectedItem?.created_at).format("MMM DD, YYYY");
    const timestamp = dayjs(selectedItem?.created_at).format("[at] HH:mm:ss");

    return (
        <>
            <View>
                <RectButton
                    onPress={() => {
                        closeBottomSheet();
                    }}
                >
                    <View className="row p-4">
                        <Feather name="trash" size={20} color={colors.text} />
                        <Text className="font-[NeueMontreal-Medium] text-base color-text">
                            To trash
                        </Text>
                    </View>
                </RectButton>
                {/* <RectButton>
                    <View className="row p-2 px-4">
                        <Feather name="edit-3" size={20} color={colors.text} />
                        <Text className="font-[NeueMontreal-Medium] text-lg color-text">
                            Rename
                        </Text>
                    </View>
                </RectButton> */}
                <RectButton>
                    <View className="row p-4">
                        <Feather name="link-2" size={20} color={colors.text} />
                        <Text className="font-[NeueMontreal-Medium] text-base color-text">
                            Create link
                        </Text>
                    </View>
                </RectButton>
            </View>
            <View className="col gap-2 p-4">
                <Text className="heading">{selectedItem?.name}</Text>
                <View className="row justify-between">
                    <Text className="font-[NeueMontreal-Medium] text-base color-text">
                        {datestamp}
                    </Text>
                    <Text className="font-[NeueMontreal-Medium] text-base color-text">
                        {timestamp}
                    </Text>
                </View>
            </View>
        </>
    );
}
