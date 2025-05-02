import { HomeStackParamsList } from "@/Router";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect } from "react";
import { BackHandler } from "react-native";

export function useBackHandler(condition: boolean, onBackPress: () => boolean) {
    const navigation =
        useNavigation<StackNavigationProp<HomeStackParamsList>>();

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

    // useEffect(() => {
    //     if (navigation) {
    //         const beforeRemoveListener = navigation.addListener(
    //             "beforeRemove",
    //             (e) => {
    //                 if (condition) {
    //                     console.log("----------");
    //                     onBackPress();
    //                     e.preventDefault();
    //                 }
    //             },
    //         );

    //         return () =>
    //             navigation.removeListener("beforeRemove", beforeRemoveListener);
    //     }
    // }, [condition, onBackPress, navigation]);
}
