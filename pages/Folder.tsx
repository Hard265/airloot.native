// External imports
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { trim } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Text, TextInput, View } from "react-native";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";

// Internal imports
import rootStore from "@/stores/rootStore";
import FolderHeaderTitle from "@/widgets/FolderHeaderTitle";
import FolderListItem from "@/widgets/FolderListItem";
import { observer } from "mobx-react-lite";
import type { HomeStackParamsList } from "../Router";
import FolderHeaderRight from "@/widgets/FolderHeaderRight";

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
            headerRight: () => <FolderHeaderRight />,
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

    return (
        <>
            {/* {fetching && isEmpty(rootStore.dirStore.currentSubdirs) ? (
                <LoadingIndicator theme={theme} />
            ) : ( */}
            <Animated.FlatList
                data={contents}
                className="flex-1"
                onScroll={scrollHandler}
                contentContainerClassName="pb-[1000]"
                renderItem={({ item }) => <FolderListItem item={item} />}
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

interface RenamingInputBoxProps {
    name: string;
    id: string;
}

function RenamingInputBox({ id, name }: RenamingInputBoxProps) {
    const { colors } = useTheme();
    const [input, setInput] = useState(name);

    const handleSubmit = () => {
        if (trim(input)) {
            // rename.onRename(id, input);
        }
    };

    const handleInputBlur = () => {
        // rename.setId(null);
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
