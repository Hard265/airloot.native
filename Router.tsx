import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";
import Signin from "./pages/Signin";
import Register from "./pages/Register";
import useSession from "./hooks/useSession";
import Home from "./pages/Home";
import Folder from "./pages/Folder";
import Reset from "./pages/Reset";
import { View } from "react-native";
import Button from "./components/Button";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import UploadButton from "./partials/UploadButton";

export type RootStackParamsList = {
    Home: undefined;
    Folder: {
        id: string;
    };
    SignIn: undefined;
    Register: undefined;
    Reset: undefined;
};

const RootStack = createStackNavigator<RootStackParamsList>();

export default function Router() {
    const colorScheme = useColorScheme();
    const session = useSession();

    const theme =
        colorScheme === "dark"
            ? { ...DarkTheme, colors: { ...DarkTheme.colors, card: "#000" } }
            : { ...DefaultTheme };

    return (
        <NavigationContainer theme={theme}>
            <RootStack.Navigator>
                {session.isAuthenticated ? (
                    <RootStack.Group
                        screenOptions={{ headerShadowVisible: false }}
                        // screenLayout={(props) => {
                        //     return (
                        //         <>
                        //             {props.children}
                        //             <UploadButton />
                        //         </>
                        //     );
                        // }}
                    >
                        <RootStack.Screen name="Home" component={Home} />
                        <RootStack.Screen
                            name="Folder"
                            options={{
                                headerShadowVisible: false,
                                animation: "slide_from_left",
                            }}
                            component={Folder}
                        />
                    </RootStack.Group>
                ) : (
                    <RootStack.Group
                        screenOptions={{
                            title: "",
                            headerShadowVisible: false,
                        }}
                    >
                        <RootStack.Screen name="SignIn" component={Signin} />
                        <RootStack.Screen
                            name="Register"
                            component={Register}
                        />
                        <RootStack.Screen name="Reset" component={Reset} />
                    </RootStack.Group>
                )}
            </RootStack.Navigator>
        </NavigationContainer>
    );
}
