import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import clsx from "clsx";
import { Text } from "react-native";
import { Feather } from "@expo/vector-icons";
import Animated, {
    ZoomIn,
    ZoomOut,
    ZoomOutLeft,
    ZoomOutRight,
} from "react-native-reanimated";

interface ListItemProps {
    title: string;
    selected?: boolean;
    marking?: boolean;
    onSelect?(): void;
    onPress?(): void;
}

export function ListItem(props: ListItemProps) {
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
