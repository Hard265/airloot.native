import ListItem from "@/components/ListItem";
import useDirOptions from "@/hooks/useDirOptions";
import { HomeStackParamsList } from "@/Router";
import { Dir } from "@/stores/dirStore";
import { File } from "@/stores/fileStore";
import rootStore from "@/stores/rootStore";
import { formatBytes } from "@/utils/intl";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import dayjs from "dayjs";
import { observer } from "mobx-react-lite";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

interface FolderListItemProps {
    item: Dir | File;
}

function FolderListItem({ item }: FolderListItemProps) {
    const navigation =
        useNavigation<StackNavigationProp<HomeStackParamsList, "Folder">>();
    const { openOptionsContext } = useDirOptions();

    const timestamp = dayjs(item.created_at).format("MMM DD, YY");

    const renderIcon = (type: "file" | "folder") => {
        return rootStore.uiStore.selectionMode ? (
            rootStore.uiStore.selectedIds.has(item.id) ? (
                <Feather name="check-square" size={20} />
            ) : (
                <Feather name="square" size={20} />
            )
        ) : (
            <Feather
                name={type === "file" ? "file-text" : "folder"}
                size={20}
            />
        );
    };
    return "size" in item ? (
        <ListItem
            title={item.name}
            subtitle={formatBytes(item.size, 2)}
            trailing={timestamp}
            icon={renderIcon("file")}
            onLongPress={() => openOptionsContext(item.id)}
        />
    ) : (
        <ListItem
            title={item.name}
            trailing={timestamp}
            icon={renderIcon("folder")}
            onLongPress={() => openOptionsContext(item.id)}
            onPress={() => {
                if (rootStore.uiStore.selectionMode)
                    rootStore.uiStore.toggleSelection(item.id);
                else navigation.push("Folder", { id: item.id });
            }}
        />
    );
}

export default observer(FolderListItem);
