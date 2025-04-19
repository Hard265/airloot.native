import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, { ZoomIn } from "react-native-reanimated";
import { useTheme } from "@react-navigation/native";

interface ListItemProps {
    title: string;
    selected?: boolean;
    marking?: boolean;
    onSelect?(): void;
    onPress?(): void;
}

export function _ListItem(props: ListItemProps) {
    const onPressHandler = () => {
        if (props.marking && props.onSelect) props.onSelect();
        else if (props.onPress) props.onPress();
    };
    return (
        <RectButton onLongPress={props.onSelect} onPress={onPressHandler}>
            <View
                accessible
                accessibilityRole="button"
                className="flex-row items-center gap-2 p-4"
            >
                {props.marking && (
                    <Animated.Text className="color-text" entering={ZoomIn}>
                        <Feather
                            name={props.selected ? "check-square" : "square"}
                            size={18}
                        />
                    </Animated.Text>
                )}
                <View className="">
                    <Text className="text-lg color-text">{props.title}</Text>
                </View>
            </View>
        </RectButton>
    );
}

interface listItemProps {
    icon?: typeof Feather.prototype.name;
    title: string;
    subtitle?: string;
    onPress?(): void;
    onLongPress?(): void;
}

export default function ListItem(props: listItemProps) {
    const theme = useTheme();
    return (
        <RectButton onPress={props.onPress} onLongPress={props.onLongPress}>
            <View className="items-ceter flex flex-row gap-4 p-4">
                <Feather
                    name={props.icon}
                    size={20}
                    color={theme.colors.text}
                />
                <View>
                    <Text className="text-lg color-text">{props.title}</Text>
                    {props.subtitle && (
                        <Text className="text-lg color-text">
                            {props.subtitle}
                        </Text>
                    )}
                </View>
            </View>
        </RectButton>
    );
}
