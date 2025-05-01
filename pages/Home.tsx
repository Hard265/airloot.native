import Avatar from "@/components/Avatar";
import rootStore from "@/stores/rootStore";
import { Feather } from "@expo/vector-icons";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { Text } from "../components/Text";
import { HomeStackParamsList } from "../Router";

type props = StackScreenProps<HomeStackParamsList, "Home">;

function Home({ navigation }: props) {
    const theme = useTheme();

    useFocusEffect(
        useCallback(() => {
            rootStore.dirStore.navigateTo(null);
        }, []),
    );

    useEffect(() => {
        navigation.setOptions({
            headerLeft() {
                return (
                    <Avatar
                        email="hardynamakhwa@gmail.com"
                        size={80}
                        onPress={() => {
                            navigation.navigate("Settings");
                        }}
                    />
                );
            },
        });
    }, [navigation]);

    return (
        <>
            <Animated.FlatList
                className="bg-background"
                data={rootStore.dirStore.currentSubdirs}
                renderItem={({ item }) => (
                    <RectButton
                        onPress={() =>
                            navigation.navigate("Folder", { id: item?.id })
                        }
                    >
                        <View className="flex flex-row items-center gap-4 p-4">
                            <Feather
                                name="folder"
                                size={20}
                                color={theme.colors.text}
                            />
                            <Text className="font-[NeueMontreal-Medium] text-lg color-text">
                                {item?.name}
                            </Text>
                        </View>
                    </RectButton>
                )}
            />
        </>
    );
}

export default observer(Home);
