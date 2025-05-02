import rootStore from "@/stores/rootStore";
import { formatBytes } from "@/utils/intl";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { defaultTo } from "lodash";
import { observer } from "mobx-react-lite";
import { Text, View } from "react-native";

function FolderOptionsHeader() {
    const dir = rootStore.uiStore.currentDirContext;
    const file = rootStore.uiStore.currentFileContext;

    const data = defaultTo(file, dir);

    return (
        <View className="flex flex-col gap-2 p-4">
            <Text className="font-[Roobert-Bold] text-2xl color-text">
                {data?.name}
            </Text>
            {data && "size" in data && (
                <Text className="font-[NeueMontreal-Regular] color-text/65">
                    {"Size: " + formatBytes(data.size)}
                </Text>
            )}
            <View className="flex flex-row items-center justify-between">
                <Text className="font-[NeueMontreal-Regular] color-text/65">
                    {dayjs(data?.created_at).format(
                        "[Created At:] MMM DD, YYYY",
                    )}
                </Text>
                <Text className="font-[NeueMontreal-Regular] color-text/65">
                    {dayjs(data?.created_at).format("HH:mm:ss")}
                </Text>
            </View>
        </View>
    );
}

export default observer(FolderOptionsHeader);
