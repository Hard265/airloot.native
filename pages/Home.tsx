import { StackScreenProps } from "@react-navigation/stack";
import { useEffect } from "react";
import { Modal, TextInput, View } from "react-native";
import Animated from "react-native-reanimated";
import { Text, Title } from "../components/Text";
import { HomeStackParamsList } from "../Router";
import ListItem from "../components/ListItem";
import { RectButton } from "react-native-gesture-handler";
import Input from "@/components/Input";
import { Feather } from "@expo/vector-icons";
import { getGravatarUrl } from "@/utils/url";
import Avatar from "@/components/Avatar";

type props = StackScreenProps<HomeStackParamsList, "Home">;

const data = [
    {
        id: "1",
        name: "lib",
        isDir: true,
    },
    {
        id: "2",
        name: "opt",
        isDir: true,
    },
    {
        id: "3",
        name: "var",
        isDir: true,
    },
];

export default function Home({ navigation }: props) {
    useEffect(() => {
        navigation.setOptions({
            headerLeft(props) {
                return (
                    <Avatar
                        email="hardynamakhwa@gmail.com"
                        size={80}
                        onPress={() => {
                            navigation.navigate("User", {});
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
                data={data}
                ListHeaderComponent={
                    <>
                        <View className="">
                            <RectButton
                                onPress={() => navigation.navigate("Root")}
                            >
                                <View className="p-4">
                                    <View className="flex flex-col gap-2">
                                        <View className="flex flex-row justify-between">
                                            <Text>0.5% Used</Text>
                                            <Text>5 GiB</Text>
                                        </View>
                                        <View className="bg-border">
                                            <View className="h-1.5 w-1/3 bg-primary" />
                                        </View>
                                    </View>
                                </View>
                            </RectButton>
                        </View>
                        <View className="p-4 py-2">
                            <Title>Recents</Title>
                        </View>
                    </>
                }
                renderItem={({ item }) => (
                    <ListItem title={item.name} icon="folder" />
                )}
            />
        </>
    );
}
