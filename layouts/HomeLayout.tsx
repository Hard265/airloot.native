import { PropsWithChildren } from "react";
import { View } from "react-native";

export default function HomeLayout(props: PropsWithChildren) {
    return (
        <>
            {props.children}
            <View className="size-4 bg-white"></View>
        </>
    );
}
