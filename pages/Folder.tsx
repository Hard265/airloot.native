import { Feather } from "@expo/vector-icons";
import {
    RouteProp,
    useNavigation,
    useRoute,
    useTheme,
} from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { flatten, isEmpty, pick, size, values } from "lodash";
import { observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import { Pressable, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
    Extrapolation,
    interpolate,
    SlideInUp,
    SlideOutUp,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { IconButton } from "../components/Button";
import { Center } from "../components/Layout";
import { Heading, Text } from "../components/Text";
import useFileOptions from "../hooks/useFileOptions";
import type { HomeStackParamsList } from "../Router";
import fileStore, { Dir, File } from "../stores/fileStore";
import FolderEmptyComponent from "../partials/FolderEmptyComponent";

type props = StackScreenProps<HomeStackParamsList, "Folder">;

export default function Folder({ route, navigation }: props) {
    const theme = useTheme();
    const folderState = useMemo(
        () => fileStore.dirs[route.params.id],
        [route.params.id],
    );

    const titleOffset = useSharedValue(32);
    const titleStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: titleOffset.value }],
    }));

    useEffect(() => {
        navigation.setOptions({
            headerTitle() {
                return (
                    <View className="overflow-hidden">
                        <Animated.Text
                            className="translate-y-8 text-2xl color-text"
                            style={[titleStyle]}
                        >
                            {folderState.name}
                        </Animated.Text>
                    </View>
                );
            },
            headerRight: (props) => (
                <View className="flex-row items-center px-4">
                    {!isEmpty(folderState.folders) && (
                        <IconButton>
                            <Feather
                                name="square"
                                size={20}
                                color={theme.colors.text}
                            />
                        </IconButton>
                    )}
                    <IconButton>
                        <Feather
                            name="search"
                            size={20}
                            color={theme.colors.text}
                        />
                    </IconButton>
                    <IconButton>
                        <Feather
                            name="more-vertical"
                            size={20}
                            color={theme.colors.text}
                        />
                    </IconButton>
                </View>
            ),
        });
    }, [
        folderState.folders,
        folderState.name,
        navigation,
        theme.colors.text,
        titleStyle,
    ]);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll(e) {
            titleOffset.value = interpolate(
                e.contentOffset.y,
                [0, 58],
                [32, 0],
                Extrapolation.CLAMP,
            );
        },
    });

    return <ListComponent scrollHandler={scrollHandler} />;
}

type routeProps = RouteProp<HomeStackParamsList, "Folder">;
type navigationProps = StackNavigationProp<HomeStackParamsList, "Folder">;

function List({ scrollHandler }: { scrollHandler: any }) {
    const route = useRoute<routeProps>();
    const navigation = useNavigation<navigationProps>();
    const theme = useTheme();
    const { ref, setFolder } = useFileOptions();

    const folderState = fileStore.dirs[route.params.id];
    const content = flatten(
        values(pick(folderState, ["folders", "files"])),
    ) as unknown as (Dir | File)[];

    return (
        <Animated.FlatList
            className="bg-background"
            onScroll={scrollHandler}
            data={content}
            ListHeaderComponent={
                <>
                    <Center>
                        <Heading>{folderState.name}</Heading>
                    </Center>
                    <View className="overflow-hidden">
                        {!isEmpty(folderState.folders) && (
                            <View className="flex-row justify-between px-4 py-2">
                                <Pressable>
                                    <View className="flex-row items-center gap-2">
                                        <Text className="text-xl color-text">
                                            Name
                                        </Text>
                                        <Feather
                                            name="chevron-down"
                                            size={20}
                                            color={theme.colors.text}
                                        />
                                    </View>
                                </Pressable>
                            </View>
                        )}
                    </View>
                </>
            }
            ListEmptyComponent={<FolderEmptyComponent />}
            renderItem={({ item }) =>
                item.size ? (
                    <RectButton>
                        <View
                            accessible
                            accessibilityRole="button"
                            className="flex-row items-start gap-4 p-4"
                        >
                            <Feather
                                name="file"
                                size={20}
                                color={theme.colors.text}
                                style={{ marginTop: 8 }}
                            />
                            <View className="flex-1">
                                <Text className="text-lg color-text">
                                    {item.name}
                                </Text>
                                <Text className="text-lg color-text">
                                    {item.size}
                                </Text>
                            </View>
                        </View>
                    </RectButton>
                ) : (
                    <RectButton
                        onLongPress={() => {
                            setFolder(item);
                            ref.current?.expand();
                        }}
                        onPress={() =>
                            navigation.push("Folder", { id: item.id })
                        }
                    >
                        <View
                            accessible
                            accessibilityRole="button"
                            className="flex-row items-center gap-4 p-4"
                        >
                            <Feather
                                name="folder"
                                size={20}
                                color={theme.colors.text}
                            />
                            <View className="flex-1">
                                <Text className="text-lg color-text">
                                    {item.name}
                                </Text>
                            </View>
                        </View>
                    </RectButton>
                )
            }
            keyExtractor={({ id }) => id}
        />
    );
}

const ListComponent = observer(List);
