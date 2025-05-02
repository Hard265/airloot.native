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
import { noop } from "lodash";
import { observer } from "mobx-react-lite";

interface FolderListItemProps {
    item: Dir | File;
}

function FolderListItem({ item }: FolderListItemProps) {
    const navigation =
        useNavigation<StackNavigationProp<HomeStackParamsList, "Folder">>();
    const { openOptionsContext } = useDirOptions();

    const timestamp = dayjs(item.created_at).format("MMM DD, YY");

    const isItemSelected = rootStore.uiStore.selectedIds.has(item.id);

    const renderIcon = (type: "file" | "folder") => {
        return rootStore.uiStore.selectionMode ? (
            isItemSelected ? (
                <Feather name="minus-square" size={20} />
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
            editing={rootStore.uiStore.renaming === item.id}
            onSubmit={noop}
            onBlur={() => rootStore.uiStore.setRenameId(null)}
            selected={isItemSelected}
            subtitle={formatBytes(item.size, 2)}
            trailing={timestamp}
            icon={renderIcon("file")}
            onLongPress={() => openOptionsContext(item.id, "file")}
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
            onSubmit={noop}
            selected={isItemSelected}
            icon={renderIcon("folder")}
            onLongPress={() => openOptionsContext(item.id, "folder")}
            onPress={() => {
                if (rootStore.uiStore.selectionMode)
                    rootStore.uiStore.toggleSelection(item.id);
                else navigation.push("Folder", { id: item.id });
            }}
        />
    );
}

export default observer(FolderListItem);
