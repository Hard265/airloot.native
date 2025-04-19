import { View } from "react-native";
import { Text } from "../components/Text";
import useFileOptions from "../hooks/useFileOptions";
import { MenuItem } from "../components/Menu";

export default function FolderOptions() {
    const { ref, folder } = useFileOptions();

    const handlePressWithClose = (fn: () => void) => {
        return () => {
            fn();
            ref.current?.close();
        };
    };

    return (
        <>
            <View className="flex flex-col items-start p-4">
                <Text className="text-3xl font-medium color-text">
                    {folder?.name}
                </Text>
                <Text className="color-text/65">subtitle</Text>
            </View>
            <View className="flex flex-col">
                <MenuItem
                    onPress={handlePressWithClose(() => {})}
                    icon="trash-2"
                    title="Move to trash"
                />
                <MenuItem
                    onPress={handlePressWithClose(() => {})}
                    icon="edit-3"
                    title="Rename"
                />
                <MenuItem
                    onPress={handlePressWithClose(() => {})}
                    icon="copy"
                    title="Copy"
                />
                <MenuItem
                    onPress={handlePressWithClose(() => {})}
                    icon="share-2"
                    title="Share"
                />
                <MenuItem
                    onPress={handlePressWithClose(() => {})}
                    icon="download"
                    title="Download"
                />
            </View>
        </>
    );
}
