import Avatar from "@/components/Avatar";
import rootStore from "@/stores/rootStore";
import FolderHeaderRight from "@/widgets/FolderHeaderRight";
import FolderListItem from "@/widgets/FolderListItem";
import HomeSearchbox from "@/widgets/HomeSearchbox";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import Animated, { LinearTransition } from "react-native-reanimated";
import { HomeStackParamsList } from "../Router";

type props = StackScreenProps<HomeStackParamsList, "Home">;

function Home({ navigation }: props) {
    const [isLoading, setIsLoading] = useState(false);

    const { dirStore, fileStore } = rootStore;
    const contents = [...dirStore.currentSubdirs, ...fileStore.currentFiles];

    const setup = useCallback(() => {
        setIsLoading(true);
        (async (id: string | null) => {
            await rootStore.dirStore.navigateTo(id);
            setIsLoading(false);
        })(null);
    }, []);

    useFocusEffect(setup);

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => <></>,
            headerTitle() {
                return (
                    <View className="flex flex-row items-center">
                        <Avatar
                            email="hardynamakhwa@gmail.com"
                            size={30}
                            onPress={() => {
                                navigation.navigate("User", {});
                            }}
                        />
                        <HomeSearchbox />
                    </View>
                );
            },
            headerTitleContainerStyle: { flex: 1 },
            headerRight() {
                return <FolderHeaderRight />;
            },
        });
    }, [navigation]);

    return (
        <>
            <Animated.FlatList
                className="bg-background"
                data={contents}
                refreshing={isLoading}
                onRefresh={setup}
                itemLayoutAnimation={LinearTransition}
                renderItem={({ item }) => <FolderListItem item={item} />}
            />
        </>
    );
}

export default observer(Home);
