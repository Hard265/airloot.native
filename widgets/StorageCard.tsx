import React from "react";
import { View, Text } from "react-native";

const StorageCard = () => {
    return (
        <View className="m-2 mb-4 flex flex-col gap-2 p-2">
            <View className="flex-row items-center justify-between gap-2">
                <Text className="font-[Roobert-Heavy] text-2xl text-text">
                    Storage
                </Text>
                <Text className="font-[Roobert-Bold] text-xl text-text">
                    60%
                </Text>
            </View>
            <View className="h-2 w-full bg-primary/15">
                <View className="h-full w-1/2 bg-primary"></View>
            </View>
        </View>
    );
};

export default StorageCard;
