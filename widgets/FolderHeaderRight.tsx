import { IconButton } from "@/components/Button";
import { useBackHandler } from "@/hooks/useBackHandler";
import rootStore from "@/stores/rootStore";
import { SORT } from "@/stores/uiStore";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { isEmpty } from "lodash";
import { observer } from "mobx-react-lite";
import { View } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { AbstractChartConfig } from "react-native-chart-kit/dist/AbstractChart";
import type { ProgressChartData } from "react-native-chart-kit/dist/ProgressChart";
import { RectButton } from "react-native-gesture-handler";

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

    const inSelectionMode = rootStore.uiStore.selectionMode;
    const hasSelections = rootStore.uiStore.selectedCount > 0;

    return (
        <View className="flex-row items-center px-4">
            <HeaderProgressIndicator />
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
            {!inSelectionMode && props.withSearch && (
                <IconButton disabled={!hasItems}>
                    <Feather name="search" size={20} />
                </IconButton>
            )}
            {!inSelectionMode && (
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
            )}
            {inSelectionMode && (
                <IconButton disabled={!hasSelections}>
                    <Feather name="trash-2" size={20} />
                </IconButton>
            )}
        </View>
    );
}

export default observer(FolderHeaderRight);

const HeaderProgressIndicator = observer(() => {
    const { colors } = useTheme();
    const data: ProgressChartData = {
        data: [rootStore.uiStore.uploadProgress],
        labels: ["progress"],
        colors: ["red"],
    };

    const chartConfig: AbstractChartConfig = {
        backgroundGradientFrom: colors.background,
        backgroundGradientTo: colors.background,
        color: (opacity = 1) => `rgba(97, 95, 255, ${opacity})`,
    };
    const radius = 12;
    const strokeWidth = 3;

    const hasProgress = !isEmpty(rootStore.uiStore.uploadsPool);

    return (
        hasProgress && (
            <RectButton>
                <View className="relative flex-row items-center justify-center p-2">
                    <ProgressChart
                        data={data}
                        height={radius * 2 + strokeWidth}
                        width={radius * 2 + strokeWidth}
                        radius={radius}
                        hideLegend
                        absolute
                        chartConfig={chartConfig}
                        strokeWidth={strokeWidth}
                    />
                    <Feather
                        name="arrow-up"
                        className="absolute"
                        size={18}
                        color={colors.text}
                    />
                </View>
            </RectButton>
        )
    );
});
