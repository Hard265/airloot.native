// External imports
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { trim } from "lodash";
import { useCallback, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";

// Internal imports
import rootStore from "@/stores/rootStore";
import FolderHeaderRight from "@/widgets/FolderHeaderRight";
import FolderHeaderTitle from "@/widgets/FolderHeaderTitle";
import FolderListItem from "@/widgets/FolderListItem";
import { observer } from "mobx-react-lite";
import type { HomeStackParamsList } from "../Router";

// Types
type props = StackScreenProps<HomeStackParamsList, "Folder">;

// Main component
function FolderScreen({ route, navigation }: props) {
    const { dirStore, fileStore } = rootStore;
    const contents = [...dirStore.currentSubdirs, ...fileStore.currentFiles];

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
            headerRight: () => <FolderHeaderRight withSearch />,
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

    async function handleRename(id: string, name: string): Promise<void> {
        if (!trim(name)) return;

        try {
            await rootStore.dirStore.update(id, { name });
        } catch (e) {
            // TODO: Toast an error message
            console.error(e);
        }
    }

    return (
        <>
            {/* {fetching && isEmpty(rootStore.dirStore.currentSubdirs) ? (
                <LoadingIndicator theme={theme} />
            ) : ( */}
            <Animated.FlatList
                data={contents}
                className="flex-1 bg-background"
                onScroll={scrollHandler}
                renderItem={({ item }) => (
                    <FolderListItem
                        item={item}
                        onRename={(name) => handleRename(item.id, name)}
                    />
                )}
                // refreshControl={
                //     <RefreshControl
                //         refreshing={fetching}
                //         colors={[theme.colors.text]}
                //         progressBackgroundColor={theme.colors.notification}
                //         progressViewOffset={85}
                //     />
                // }
                ListHeaderComponent={<ListHeader />}
                ListEmptyComponent={<EmptyList />}
            />
            {/* )} */}
        </>
    );
}

export default observer(FolderScreen);

// Sub-components

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
