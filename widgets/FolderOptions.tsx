import { useFeedback } from "@/hooks/useFeedback";
import useFolderOptions from "@/hooks/useFolderOptions";
import rootStore from "@/stores/rootStore";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import dayjs from "dayjs";
import { Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

export default function FolderOptions() {
    const { colors } = useTheme();
    const { selectedItem, closeBottomSheet } = useFolderOptions();
    const { alert } = useFeedback();

    const datestamp = dayjs(selectedItem?.created_at).format("MMM DD, YYYY");
    const timestamp = dayjs(selectedItem?.created_at).format("[at] HH:mm:ss");

    const opts: {
        title: string;
        icon: keyof typeof Feather.glyphMap;
        action(): void;
    }[] = [
        {
            title: "Rename",
            icon: "edit-3",
            action: function (): void {
                closeBottomSheet();
                rootStore.uiStore.setRenameId(selectedItem?.id || null);
            },
        },
        {
            title: "Copy",
            icon: "copy",
            action: function (): void {
                throw new Error("Function not implemented.");
            },
        },
        {
            title: "Download",
            icon: "download",
            action: function (): void {
                throw new Error("Function not implemented.");
            },
        },
        {
            title: "Link",
            icon: "link-2",
            action: function (): void {
                throw new Error("Function not implemented.");
            },
        },
        {
            title: "Delete",
            icon: "trash-2",
            action: () => {
                closeBottomSheet();
                alert({
                    title: "Delete permanently?",
                    message: (
                        <>
                            Are you sure you want to delete{" "}
                            <Text className="font-[NeueMontreal-Medium] color-text">
                                {selectedItem?.name}
                            </Text>{" "}
                            folder? This action cannot be undone.
                        </>
                    ),
                    actions: ["Sure", "Cancel"],
                }).then((agreed) => {
                    if (agreed && selectedItem) {
                        rootStore.dirStore.delete(selectedItem?.id);
                    }
                });
            },
        },
    ];

    return (
        <>
            <View className="col gap-2 p-4">
                <Text className="heading">{selectedItem?.name}</Text>
                <View className="row justify-between">
                    <Text className="font-[NeueMontreal-Regular] text-base color-text">
                        {datestamp}
                    </Text>
                    <Text className="font-[NeueMontreal-Regular] text-base color-text">
                        {timestamp}
                    </Text>
                </View>
            </View>
            <View className="row mb-4 flex-wrap justify-evenly">
                {opts.map((opt, index) => (
                    <RectButton key={index} onPress={opt.action}>
                        <View className="col items-center gap-2 p-2">
                            <Feather
                                name={opt.icon}
                                size={20}
                                color={colors.text}
                            />
                            <Text className="label text-base">{opt.title}</Text>
                        </View>
                    </RectButton>
                ))}
            </View>
        </>
    );
}
