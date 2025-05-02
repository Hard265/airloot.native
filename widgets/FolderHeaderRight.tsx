import { IconButton } from "@/components/Button";
import rootStore from "@/stores/rootStore";
import { SORT } from "@/stores/uiStore";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { observer } from "mobx-react-lite";
import { View } from "react-native";
import { useBackHandler } from "@/hooks/useBackHandler";

interface FolderHeaderRightProps {
    withSearch?: boolean;
}

function FolderHeaderRight(props: FolderHeaderRightProps) {
    const theme = useTheme();

    useBackHandler(rootStore.uiStore.selectionMode, () => {
        rootStore.uiStore.turnSelectionMode(false);
        return true;
    });

    const hasItems =
        !isEmpty(rootStore.dirStore.currentSubdirs) ||
        !isEmpty(rootStore.fileStore.currentFiles);

    return (
        <View className="flex-row items-center px-4">
            <IconButton
                disabled={!hasItems}
                onPress={() => {
                    rootStore.uiStore.turnSelectionMode(
                        !rootStore.uiStore.selectionMode,
                    );
                }}
            >
                <Feather
                    name="square"
                    color={
                        rootStore.uiStore.selectionMode
                            ? theme.colors.primary
                            : theme.colors.text
                    }
                    size={20}
                />
            </IconButton>
            {props.withSearch && (
                <IconButton disabled={!hasItems}>
                    <Feather name="search" size={20} />
                </IconButton>
            )}
            <IconButton
                onPress={() => rootStore.uiStore.switchSort()}
                disabled={!hasItems}
            >
                {rootStore.uiStore.sorting === SORT.ASC ? (
                    <MaterialCommunityIcons
                        name="sort-alphabetical-ascending"
                        size={22}
                        color={theme.colors.text}
                    />
                ) : (
                    <MaterialCommunityIcons
                        name="sort-alphabetical-descending"
                        size={22}
                        color={theme.colors.primary}
                    />
                )}
            </IconButton>
        </View>
    );
}

export default observer(FolderHeaderRight);
