import Animated, {
    Extrapolation,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";
import { Heading, Text } from "../components/Text";
import { StackScreenProps } from "@react-navigation/stack";
import type { RootStackParamsList } from "../Router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { isEmpty, xor, includes, size } from "lodash";
import clsx from "clsx";

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

type props = StackScreenProps<RootStackParamsList, "Folder">;

export default function Folder({ route, navigation }: props) {
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
                      <Text className="p-4 text-2xl">{size(selected)}</Text>
                  ),
            headerTitle() {
                return (
                    <View className="overflow-hidden">
                        <Animated.Text
                            className="color-text translate-y-8 text-2xl"
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

    const longPressHandler = (id: typeof route.params.id) => {
        setSelected((prev) => xor(prev, [id]));
    };

    const pressHandler = (id: typeof route.params.id) => {
        if (isEmpty(selected)) console.log();
        else setSelected((prev) => xor(prev, [id]));
    };

    return (
        <Animated.FlatList
            className="bg-background"
            onScroll={scrollHandler}
            data={data}
            ListHeaderComponent={
                <View className="items-center">
                    <Heading>{name}</Heading>
                    <View className="flex-row justify-between px-4 py-2">
                        <Text>Name</Text>
                    </View>
                </View>
            }
            renderItem={({ item }) => (
                <RectButton
                    onLongPress={() => longPressHandler(item.id)}
                    onPress={() => pressHandler(item.id)}
                >
                    <View
                        accessible
                        accessibilityRole="button"
                        className={clsx(
                            "flex-row gap-2 p-4",
                            includes(selected, item.id) && "bg-primary/5",
                        )}
                    >
                        <Text className="text-xl">{item.name}</Text>
                    </View>
                </RectButton>
            )}
            keyExtractor={({ id }) => id}
        />
    );
}
