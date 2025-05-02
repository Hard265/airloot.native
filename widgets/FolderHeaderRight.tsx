import { IconButton } from "@/components/Button";
import rootStore from "@/stores/rootStore";
import { SORT } from "@/stores/uiStore";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { observer } from "mobx-react-lite";
import { View } from "react-native";
import { useBackHandler } from "@/hooks/useBackHandler";

function FolderHeaderRight() {
    const theme = useTheme();

    useBackHandler(rootStore.uiStore.selectionMode, () => {
        rootStore.uiStore.turnSelectionMode(false);
        return true;
    });

    const hasItems = !isEmpty(rootStore.dirStore.currentSubdirs);

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
                    name={
                        rootStore.uiStore.selectionMode ? "x-square" : "square"
                    }
                    size={20}
                />
            </IconButton>
            <IconButton disabled={!hasItems}>
                <Feather name="search" size={20} />
            </IconButton>
            <IconButton
                onPress={() => rootStore.uiStore.switchSort()}
                disabled={!hasItems}
            >
                <MaterialCommunityIcons
                    name={
                        rootStore.uiStore.sorting === SORT.ASC
                            ? "sort-alphabetical-ascending"
                            : "sort-alphabetical-descending"
                    }
                    size={22}
                    color={theme.colors.text}
                />
            </IconButton>
        </View>
    );
}

export default observer(FolderHeaderRight);
