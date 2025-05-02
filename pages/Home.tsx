import Avatar from "@/components/Avatar";
import rootStore from "@/stores/rootStore";
import FolderHeaderRight from "@/widgets/FolderHeaderRight";
import FolderListItem from "@/widgets/FolderListItem";
import { useFocusEffect } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect } from "react";
import Animated from "react-native-reanimated";
import { HomeStackParamsList } from "../Router";

type props = StackScreenProps<HomeStackParamsList, "Home">;

function Home({ navigation }: props) {
    const { dirStore, fileStore } = rootStore;
    const contents = [...dirStore.currentSubdirs, ...fileStore.currentFiles];

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
                renderItem={({ item }) => <FolderListItem item={item} />}
            />
        </>
    );
}

export default observer(Home);
