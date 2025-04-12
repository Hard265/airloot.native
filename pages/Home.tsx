import { ScrollView } from "react-native";
import { Heading, Link, Title } from "../components/Text";
import Animated from "react-native-reanimated";
import { View } from "react-native";

export default function Home() {
    return (
        <Animated.FlatList
            className="bg-background"
            data={[]}
            ListHeaderComponent={
                <>
                    <View className="p-4">
                        <View className="bg-primary/20 h-12 w-full"></View>
                    </View>
                    <View className="p-4 py-2">
                        <Title>Recents</Title>
                    </View>
                </>
            }
            renderItem={({ item }) => <View></View>}
        />
    );
}
