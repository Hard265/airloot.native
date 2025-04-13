import { PropsWithChildren } from "react";
import { View } from "react-native";

export const Center = ({ children }: PropsWithChildren) => {
    return <View className="items-center">{children}</View>;
};
