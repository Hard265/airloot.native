import ListItem from "@/components/ListItem";
import useFolderOptions from "@/hooks/useFolderOptions";
import { HomeStackParamsList } from "@/Router";
import { Dir } from "@/stores/dirStore";
import { File } from "@/stores/fileStore";
import rootStore from "@/stores/rootStore";
import { formatBytes } from "@/utils/intl";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import { noop } from "lodash";
import { observer } from "mobx-react-lite";
import Animated, {
    FadeIn,
    FadeOut,
    LinearTransition,
} from "react-native-reanimated";

interface FolderListItemProps {
    item: Dir | File;
    onRename: (name: string) => void;
}

function FolderListItem({ item, onRename = noop }: FolderListItemProps) {
    const navigation =
        useNavigation<StackNavigationProp<HomeStackParamsList, "Folder">>();
    const { openBottomSheet } = useFolderOptions();

    const timestamp = dayjs(item.created_at).format("MMM DD, YY");

    const isItemSelected = rootStore.uiStore.selectedIds.has(item.id);

    const renderIcon = (type: "file" | "folder") => {
        return rootStore.uiStore.selectionMode ? (
            isItemSelected ? (
                <Feather name="x-square" size={24} />
            ) : (
                <Feather name="square" size={24} />
            )
        ) : (
            <Feather
                name={type === "file" ? "file-text" : "folder"}
                size={20}
            />
        );
    };
    return (
        <Animated.View
            entering={FadeIn}
            exiting={FadeOut}
            layout={LinearTransition}
        >
            {"size" in item ? (
                <ListItem
                    title={item.name}
                    editing={rootStore.uiStore.renaming === item.id}
                    onSubmit={(name) => onRename(name)}
                    onBlur={() => rootStore.uiStore.setRenameId(null)}
                    selected={isItemSelected}
                    subtitle={formatBytes(item.size, 2)}
                    trailing={timestamp}
                    icon={renderIcon("file")}
                    onLongPress={() => openBottomSheet(item)}
                    onPress={() => {
                        if (rootStore.uiStore.selectionMode)
                            rootStore.uiStore.toggleSelection(item.id);
                    }}
                />
            ) : (
                <ListItem
                    title={item.name}
                    trailing={timestamp}
                    editing={rootStore.uiStore.renaming === item.id}
                    onBlur={() => rootStore.uiStore.setRenameId(null)}
                    onSubmit={(name) => onRename(name)}
                    selected={isItemSelected}
                    icon={renderIcon("folder")}
                    onLongPress={() => openBottomSheet(item)}
                    onPress={() => {
                        if (rootStore.uiStore.selectionMode)
                            rootStore.uiStore.toggleSelection(item.id);
                        else navigation.push("Folder", { id: item.id });
                    }}
                />
            )}
        </Animated.View>
    );
}

export default observer(FolderListItem);
