import rootStore from "@/stores/rootStore";
import dayjs from "dayjs";
import { Text, View } from "react-native";

export default function FolderOptionsHeader() {
    const { dirStore } = rootStore;

    return (
        <View className="flex flex-col gap-1 p-4">
            <Text className="font-[Roobert-Bold] text-2xl color-text">
                {dirStore.currentDir?.name}
            </Text>
            <View className="flex flex-row items-center justify-between">
                <Text className="font-[NeueMontreal-Regular] color-text/50">
                    {dayjs(dirStore.currentDir?.created_at).format(
                        "MMM DD, YYYY",
                    )}
                </Text>
                <Text className="font-[NeueMontreal-Regular] color-text/65">
                    {dayjs(dirStore.currentDir?.created_at).format(
                        "[At] HH:mm:ss",
                    )}
                </Text>
            </View>
        </View>
    );
}
