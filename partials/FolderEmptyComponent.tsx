import { Pressable, View } from "react-native";
import { Text } from "../components/Text";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { HomeStackParamsList } from "../Router";

type props = StackNavigationProp<HomeStackParamsList, "Folder">;
export default function FolderEmptyComponent() {
    const navigation = useNavigation<props>();
    return (
        <View className="flex-1 items-center justify-center py-80">
            <Text className="my-auto h-full text-2xl color-text">
                No content to display
            </Text>
            {navigation.canGoBack() && (
                <Pressable onPress={() => navigation.pop()}>
                    <Text className="color-primary">go back</Text>
                </Pressable>
            )}
        </View>
    );
}
