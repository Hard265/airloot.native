import React from "react";
import { View, Text } from "react-native";

const StorageCard = () => {
    return (
        <View className="col m-2 mb-4 p-2">
            <View className="row justify-between gap-2">
                <Text className="h3">Storage</Text>
                <Text className="font-[Roobert-Medium] text-lg text-text">
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
