import { useTheme } from "@react-navigation/native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { Text, View } from "react-native";

import rootStore from "@/stores/rootStore";
import useDirOptions from "@/hooks/useDirOptions";
import { useBackHandler } from "@/hooks/useBackHandler";

export default function FolderOptionsActions() {
    const { colors } = useTheme();
    const { closeOptionsContext, showPrompt } = useDirOptions();

    const currentContextId =
        rootStore.uiStore.currentDirContext?.id ||
        rootStore.uiStore.currentFileContext?.id;

    const closeOptions = (action: () => void) => () => {
        action();
        closeOptionsContext();
    };

    useBackHandler(!!rootStore.uiStore.renaming, () => {
        rootStore.uiStore.setRenameId(null);
        return true;
    });

    const onRename = () => {
        rootStore.uiStore.setRenameId(currentContextId || null);
    };

    return (
        <View className="flex flex-col">
            {/* Rename Option */}
            <RectButton onPress={closeOptions(onRename)}>
                <View className="flex flex-row items-center gap-4 p-4">
                    <Feather name="file-text" size={20} color={colors.text} />
                    <Text className="font-[NeueMontreal-Regular] text-lg color-text">
                        Rename
                    </Text>
                </View>
            </RectButton>

            {/* Copy Option */}
            <RectButton>
                <View className="flex flex-row items-center gap-4 p-4">
                    <Feather name="copy" size={20} color={colors.text} />
                    <Text className="font-[NeueMontreal-Regular] text-lg color-text">
                        Copy
                    </Text>
                </View>
            </RectButton>

            {/* Create Link Option */}
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

            {/* Save to Device Option */}
            <RectButton>
                <View className="flex flex-row items-center gap-4 p-4">
                    <Feather name="download" size={20} color={colors.text} />
                    <Text className="font-[NeueMontreal-Regular] text-lg color-text">
                        Save to device
                    </Text>
                </View>
            </RectButton>

            {/* Permanently Delete Option */}
            <RectButton
                onPress={closeOptions(() => {
                    showPrompt({
                        message:
                            "This action cannot be undone. Are you sure you want to permanently delete this item?",
                        cancelLabel: "Cancel",
                        confirmLabel: "Sure",
                    }).then((e) => {
                        if (e) rootStore.dirStore.delete(currentContextId!);
                    });
                })}
            >
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
