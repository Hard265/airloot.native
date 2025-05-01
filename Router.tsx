import {
    DarkTheme,
    DefaultTheme,
    NavigationContainer,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";
import colors from "tailwindcss/colors";
import useSession from "./hooks/useSession";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Reset from "./pages/Reset";
import ResetLinkSent from "./pages/ResetLinkSent";
import Settings from "./pages/Settings";
import Signin from "./pages/Signin";
import FolderOptionsProvider from "./providers/FolderOptionsProvider";
import Folder from "./pages/Folder";
import HomeProvider from "./providers/HomeProvider";
import FolderOptions from "./widgets/FolderOptions";

export type RootStackParamsList = {
    Index: undefined;
    SignIn: undefined;
    Register: undefined;
    ResetLinkSent: undefined;
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
    Search:
        | undefined
        | {
              query: string;
          };
    Settings: undefined;
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
        >
            <HomeStack.Screen
                name="Home"
                component={Home}
                // layout={(props) => (
                //     <HomeProvider {...props}>{props.children}</HomeProvider>
                // )}
            />
            <HomeStack.Group
                screenLayout={(props) => (
                    <FolderOptionsProvider {...props}>
                        <FolderOptions>{props.children}</FolderOptions>
                    </FolderOptionsProvider>
                )}
            >
                <HomeStack.Screen name="Folder" component={Folder} />
            </HomeStack.Group>
            {/* <HomeStack.Screen
                name="User"
                component={User}
                options={{
                    presentation: "transparentModal",
                    animation: "fade",
                    headerShown: false,
                }}
            />
            <HomeStack.Screen name="Root" component={Root} />
            <HomeStack.Screen name="Search" component={Search} /> */}
            <HomeStack.Screen name="Settings" component={Settings} />
        </HomeStack.Navigator>
    );
}

function Router() {
    const colorScheme = useColorScheme();
    const theme = getTheme(colorScheme);

    const { authenticated } = useSession();

    return (
        <NavigationContainer theme={theme}>
            <RootStack.Navigator
                screenOptions={{
                    animation: "slide_from_right",
                }}
            >
                {authenticated ? (
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
                        <RootStack.Screen
                            name="ResetLinkSent"
                            component={ResetLinkSent}
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
                  primary: colors.indigo[400],
                  card: colors.black,
                  notification: colors.zinc[800],
              },
          }
        : {
              ...DefaultTheme,
              colors: {
                  ...DefaultTheme.colors,
                  primary: colors.indigo[500],
                  notification: colors.white,
              },
          };
}

export default Router;
