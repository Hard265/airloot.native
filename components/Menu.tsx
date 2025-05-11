import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { PropsWithChildren, ReactNode, useState } from "react";
import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

interface MenuItemProps {
    onPress?: () => void;
    icon: typeof Feather.prototype.name;
    title: string;
    subtitle?: string;
}

export function MenuItem({ onPress, icon, title, subtitle }: MenuItemProps) {
    const theme = useTheme();
    return (
        <RectButton onPress={onPress}>
            <View className="flex flex-row items-center gap-4 p-4">
                <Feather name={icon} size={20} color={theme.colors.text} />
                <View className="flex flex-col">
                    <Text className="font-[NeueMontreal-Medium] text-base color-text">
                        {title}
                    </Text>
                    {subtitle && (
                        <Text className="text-sm color-text">{subtitle}</Text>
                    )}
                </View>
            </View>
        </RectButton>
    );
}

interface MenuProps extends PropsWithChildren {
    trigger: ReactNode;
}

export function Menu(props: MenuProps) {
    const [shown, setShown] = useState(true);

    return (
        <View>
            <View className="relative">
                <TouchableWithoutFeedback style={StyleSheet.absoluteFillObject}>
                    <Text></Text>
                </TouchableWithoutFeedback>
                <RectButton onPress={() => setShown(!shown)}>
                    {props.trigger}
                </RectButton>
                {shown && (
                    <Animated.View
                        className="absolute right-0 top-0 h-[1000] w-20 rounded-sm bg-indigo-50 p-4 shadow-md"
                        entering={FadeIn}
                        exiting={FadeOut}
                    >
                        {props.children}
                    </Animated.View>
                )}
            </View>
        </View>
    );
}
