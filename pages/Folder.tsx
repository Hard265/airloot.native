import { StackScreenProps } from "@react-navigation/stack";
import clsx from "clsx";
import { includes, isEmpty, size, xor } from "lodash";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { Heading, Text } from "../components/Text";
import type { HomeStackParamsList } from "../Router";
import { ListItem } from "../components/ListItem";
import { Center } from "../components/Layout";
import useFileOptions from "../hooks/useFileOptions";

const data = [
    {
        id: "1",
        name: "msfcosole",
        isDir: true,
    },
    {
        id: "2",
        name: "msfvenom",
        isDir: true,
    },
    {
        id: "4",
        name: "evilginx2",
        isDir: true,
    },
];

type props = StackScreenProps<HomeStackParamsList, "Folder">;

export default function Folder({ route, navigation }: props) {
    const { openFolderOptions } = useFileOptions();
    const titleOffset = useSharedValue(32);
    const name = "lib";

    const [selected, setSelected] = useState<(typeof route.params.id)[]>([]);

    const titleStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: titleOffset.value }],
    }));

    useEffect(() => {
        navigation.setOptions({
            headerLeft: isEmpty(selected)
                ? undefined
                : (props) => (
                      <Text className="p-4 text-2xl color-text">
                          {size(selected)}
                      </Text>
                  ),
            headerTitle() {
                return (
                    <View className="overflow-hidden">
                        <Animated.Text
                            className="translate-y-8 text-2xl color-text"
                            style={[titleStyle]}
                        >
                            {name}
                        </Animated.Text>
                    </View>
                );
            },
        });
    }, [selected]);

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

    return (
        <Animated.FlatList
            className="bg-background"
            onScroll={scrollHandler}
            data={data}
            ListHeaderComponent={
                <>
                    <Center>
                        <Heading>{name}</Heading>
                    </Center>
                    {
                        <View className="flex-row justify-between px-4 py-2">
                            <Text className="text-xl">Name</Text>
                        </View>
                    }
                </>
            }
            renderItem={({ item }) => (
                <ListItem
                    title={item.name}
                    marking={!isEmpty(selected)}
                    selected={includes(selected, item.id)}
                    onSelect={() => setSelected((prev) => xor(prev, [item.id]))}
                    onPress={() => openFolderOptions({ name: item.name })}
                />
            )}
            keyExtractor={({ id }) => id}
        />
    );
}
