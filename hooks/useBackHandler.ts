import { useEffect } from "react";
import { BackHandler } from "react-native";

export function useBackHandler(condition: boolean, onBackPress: () => boolean) {
    useEffect(() => {
        const handleBackButtonPress = () => {
            if (condition) {
                return onBackPress();
            }
            return false;
        };

        const backHandlerSubscription = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackButtonPress,
        );

        return () => backHandlerSubscription.remove();
    }, [condition, onBackPress]);
}
