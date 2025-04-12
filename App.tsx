import "./global.css";

import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import SessionProvider from "./providers/SessionProvider";
import Router from "./Router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
    return (
        <SessionProvider>
            <GestureHandlerRootView className="flex-1">
                <View className="bg-background flex-1">
                    <Router />
                    <StatusBar style="auto" />
                </View>
            </GestureHandlerRootView>
        </SessionProvider>
    );
}
