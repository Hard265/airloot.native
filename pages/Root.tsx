import { View } from "react-native";
import Animated, { SlideInUp, SlideOutUp } from "react-native-reanimated";
import { Center } from "../components/Layout";
import { Heading } from "../components/Text";
import { concat, isEmpty } from "lodash";
import fileStore, { Dir, File } from "../stores/fileStore";
import { Pressable } from "react-native";
import { Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import ListItem from "../components/ListItem";
import { StackScreenProps } from "@react-navigation/stack";
import { HomeStackParamsList } from "../Router";
import useFileOptions from "../hooks/useFileOptions";
import FolderEmptyComponent from "../partials/FolderEmptyComponent";

type screenNavigationProps = StackScreenProps<HomeStackParamsList, "Root">;

export default function Root({ navigation }: screenNavigationProps) {
    const theme = useTheme();
    const { ref, setFolder } = useFileOptions();
    const state = fileStore.dirs["."];
    const contents = concat(state.folders, state.files) as (File | Dir)[];

    return (
        <Animated.FlatList
            className="bg-background"
            data={contents}
            ListHeaderComponent={
                <>
                    <Center>
                        <Heading>{state.name}</Heading>
                    </Center>
                    <View className="overflow-hidden">
                        {!isEmpty(contents) && (
                            <Animated.View
                                entering={SlideInUp}
                                exiting={SlideOutUp}
                                className="flex-row justify-between px-4 py-2"
                            >
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
                            </Animated.View>
                        )}
                    </View>
                </>
            }
            ListEmptyComponent={<FolderEmptyComponent />}
            renderItem={({ item }) => (
                <ListItem
                    title={item.name}
                    icon="folder"
                    onPress={() => navigation.push("Folder", { id: item.id })}
                    onLongPress={() => {
                        setFolder(item);
                        ref.current?.expand();
                    }}
                />
            )}
        />
    );
}
