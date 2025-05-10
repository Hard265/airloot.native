import "./global.css";

import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { observer } from "mobx-react-lite";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Session from "./providers/Session";
import Router from "./Router";

function App() {
    const [fontsLoaded, fontsError] = useFonts({
        "NeueMontreal-Bold": require("./assets/fonts/montreal/NeueMontreal-Bold.otf"),
        "NeueMontreal-Medium": require("./assets/fonts/montreal/NeueMontreal-Medium.otf"),
        "NeueMontreal-Regular": require("./assets/fonts/montreal/NeueMontreal-Regular.otf"),
        "NeueMontreal-Light": require("./assets/fonts/montreal/NeueMontreal-Light.otf"),
        "Roobert-Heavy": require("./assets/fonts/roobert/Roobert-Heavy.otf"),
        "Roobert-Bold": require("./assets/fonts/roobert/Roobert-Bold.otf"),
        "Roobert-SemiBold": require("./assets/fonts/roobert/Roobert-SemiBold.otf"),
        "Roobert-Medium": require("./assets/fonts/roobert/Roobert-Medium.otf"),
        "Roobert-Regular": require("./assets/fonts/roobert/Roobert-Regular.otf"),
        "Roobert-Light": require("./assets/fonts/roobert/Roobert-Light.otf"),
    });
    if (!fontsLoaded || fontsError) return null;
    return (
        <GestureHandlerRootView style={{flex: 1}}>
            <Session>
                <View className="flex-1 bg-background">
                    <Router />
                    <StatusBar style="auto" />
                </View>
            </Session>
        </GestureHandlerRootView>
    );
}

export default observer(App);
