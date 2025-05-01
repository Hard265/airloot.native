// External imports
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { has, isEmpty, trim } from "lodash";
import { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    RefreshControl,
    Text,
    TextInput,
    View,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";

// Internal imports
import { IconButton } from "@/components/Button";
import useFolder from "@/hooks/useFolder";
import { Dir } from "@/stores/dirStore";
import rootStore from "@/stores/rootStore";
import { SORT, TargetType } from "@/stores/uiStore";
import FolderHeaderTitle from "@/widgets/FolderHeaderTitle";
import { observer } from "mobx-react-lite";
import type { HomeStackParamsList } from "../Router";

// Types
type props = StackScreenProps<HomeStackParamsList, "Folder">;

// Main component
function FolderScreen({ route, navigation }: props) {
    const theme = useTheme();
    const { fetching, rename } = useFolder();

    useFocusEffect(
        useCallback(() => {
            rootStore.dirStore.navigateTo(route.params.id);
        }, [route.params.id]),
    );

    // Title scrolling offset
    const offset = useSharedValue(32);
    const offsetStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: offset.value }],
    }));

    useEffect(() => {
        navigation.setOptions({
            headerTitle() {
                return (
                    <FolderHeaderTitle
                        title={String(rootStore.dirStore.currentDir?.name)}
                        style={offsetStyle}
                    />
                );
            },
            headerRight: () => <HeaderRight />,
        });
    }, [navigation, offsetStyle]);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll(e) {
            offset.value = interpolate(
                e.contentOffset.y,
                [0, 58],
                [32, 0],
                Extrapolation.CLAMP,
            );
        },
    });

    const renderItem = (item: Dir) => {
        return has(item, "size") ? (
            <RectButton>
                <View className="flex flex-row items-center gap-4 p-4">
                    <Feather
                        name="file-text"
                        size={20}
                        color={theme.colors.text}
                    />
                    {rename.id === item.id ? (
                        <TextInput value={item.name} />
                    ) : (
                        <Text className="font-[NeueMontreal-Medium] text-lg color-text">
                            {item?.name}
                        </Text>
                    )}
                </View>
            </RectButton>
        ) : (
            <RectButton
                onPress={() => navigation.push("Folder", { id: item.id })}
                onLongPress={() =>
                    rootStore.uiStore.setContextMenuTarget(
                        item.id,
                        TargetType.FOLDER,
                    )
                }
            >
                <View className="flex flex-row items-center gap-4 p-4">
                    <Feather
                        name="folder"
                        size={20}
                        color={theme.colors.text}
                    />
                    {rename.id === item.id ? (
                        <RenamingInputBox name={item.name} id={item.id} />
                    ) : (
                        <Text className="font-[NeueMontreal-Medium] text-lg color-text">
                            {item?.name}
                        </Text>
                    )}
                </View>
            </RectButton>
        );
    };

    return (
        <>
            {fetching && isEmpty(rootStore.dirStore.currentSubdirs) ? (
                <LoadingIndicator theme={theme} />
            ) : (
                <Animated.FlatList
                    data={rootStore.dirStore.currentSubdirs}
                    className="flex-1"
                    onScroll={scrollHandler}
                    contentContainerClassName="pb-[1000]"
                    renderItem={({ item }) => renderItem(item)}
                    refreshControl={
                        <RefreshControl
                            refreshing={fetching}
                            colors={[theme.colors.text]}
                            progressBackgroundColor={theme.colors.notification}
                            progressViewOffset={85}
                        />
                    }
                    ListHeaderComponent={<ListHeader />}
                    ListEmptyComponent={<EmptyList />}
                />
            )}
        </>
    );
}

export default observer(FolderScreen);

// Sub-components

const HeaderRight = observer(() => {
    const theme = useTheme();
    const hasItems = !isEmpty(rootStore.dirStore.currentSubdirs);

    return (
        <View className="flex-row items-center px-4">
            <IconButton disabled={!hasItems}>
                <Feather name="square" size={20} color={theme.colors.text} />
            </IconButton>
            <IconButton disabled={!hasItems}>
                <Feather name="search" size={20} color={theme.colors.text} />
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
});

interface LoadingIndicatorProps {
    theme: { colors: { text: string } };
}

function LoadingIndicator({ theme }: LoadingIndicatorProps) {
    return (
        <View className="flex-1 items-center justify-center">
            <ActivityIndicator size="large" color={theme.colors.text} />
        </View>
    );
}

const ListHeader = observer(() => {
    return (
        <View className="p-4">
            <Text className="text-center font-[Roobert-Bold] text-4xl color-text">
                {rootStore.dirStore.currentDir?.name}
            </Text>
        </View>
    );
});

function EmptyList() {
    return (
        <View className="flex flex-col items-center justify-center gap-2 p-8 py-16">
            <Text className="font-[NeueMontreal-Medium] text-lg color-text/80">
                No content to display.
            </Text>
        </View>
    );
}

interface RenamingInputBoxProps {
    name: string;
    id: string;
}

function RenamingInputBox({ id, name }: RenamingInputBoxProps) {
    const { colors } = useTheme();
    const [input, setInput] = useState(name);
    const { rename } = useFolder();

    const handleSubmit = () => {
        if (trim(input)) {
            rename.onRename(id, input);
        }
    };

    const handleInputBlur = () => {
        rename.setId(null);
    };
    return (
        <View className="flex-1">
            <TextInput
                value={input}
                autoFocus
                onChangeText={setInput}
                selectTextOnFocus
                onBlur={handleInputBlur}
                onSubmitEditing={handleSubmit}
                selectionColor={colors.primary}
                selectionHandleColor={colors.primary}
                className="flex-1 border border-primary p-2 py-1 font-[NeueMontreal-Medium] text-lg color-text"
            />
        </View>
    );
}
