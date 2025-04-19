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
import colors from "tailwindcss/colors";
import HomeLayout from "./layouts/HomeLayout";
import Root from "./pages/Root";
import User from "./pages/User";

export type RootStackParamsList = {
    Index: undefined;
    SignIn: undefined;
    Register: undefined;
    Reset: undefined;
};

export type HomeStackParamsList = {
    Home: undefined;
    User: {
        id?: string;
    };
    Folder: {
        id: string;
    };
    Root: undefined;
};

const RootStack = createStackNavigator<RootStackParamsList>();
const HomeStack = createStackNavigator<HomeStackParamsList>();

function HomeRouter() {
    return (
        <HomeStack.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShadowVisible: false,
                title: "",
                animation: "slide_from_right",
            }}
            layout={(props) => <HomeLayout {...props} />}
        >
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen
                name="User"
                component={User}
                options={{
                    presentation: "transparentModal",
                    animation: "fade",
                    headerShown: false,
                }}
            />
            <HomeStack.Screen name="Root" component={Root} />
            <HomeStack.Screen name="Folder" component={Folder} />
        </HomeStack.Navigator>
    );
}

export default function Router() {
    const colorScheme = useColorScheme();
    const session = useSession();

    const theme = getTheme(colorScheme);

    return (
        <NavigationContainer theme={theme}>
            <RootStack.Navigator
                screenOptions={{
                    animation: "slide_from_right",
                }}
            >
                {session.isAuthenticated ? (
                    <RootStack.Screen
                        name="Index"
                        options={{ headerShown: false }}
                        component={HomeRouter}
                    />
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
function getTheme(colorScheme: string | null | undefined) {
    return colorScheme === "dark"
        ? {
              ...DarkTheme,
              colors: {
                  ...DarkTheme.colors,
                  card: colors.black,
                  notification: colors.zinc[800],
              },
          }
        : {
              ...DefaultTheme,
              colors: {
                  ...DefaultTheme.colors,
                  notification: colors.white,
              },
          };
}
