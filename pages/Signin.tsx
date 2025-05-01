import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Button from "../components/Button";
import Input from "../components/Input";
import { pick } from "lodash";
import useSession from "@/hooks/useSession";
import Animated, { SlideInUp } from "react-native-reanimated";

export default function Signin() {
    const { signIn } = useSession();
    const [pending, setPending] = useState(false);
    const [formState, setFormState] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({
        detail: "",
    });

    const onSign = async () => {
        setPending(true);
        try {
            await signIn(formState);
        } catch (e: any) {
            setErrors((prev) => ({
                ...prev,
                ...pick(e.response.data, ["detail", "password", "email"]),
            }));
        }
        {
            setPending(false);
        }
    };

    const updateField = (field: string, value: string) => {
        setErrors((prev) => ({ ...prev, [field]: value, detail: "" }));
        setFormState((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const isFormTrue = Object.values(formState).every(Boolean);

    return (
        <ScrollView>
            <Text className="p-4 font-[Roobert-Bold] text-3xl color-text">
                Sign In
            </Text>
            {errors.detail && (
                <View className="relative overflow-hidden">
                    <Animated.View
                        entering={SlideInUp}
                        className="m-4 border-l-4 border-red-600 bg-red-500 p-4 dark:border-red-500 dark:bg-red-400"
                    >
                        <Text className="font-[NeueMontreal-Regular] color-white">
                            {errors.detail}
                        </Text>
                    </Animated.View>
                </View>
            )}
            <Input
                label="Email address"
                type="email-address"
                value={formState.email}
                onChange={(value) => updateField("email", value)}
            />
            <Input
                label="Password"
                secureTextEntry
                value={formState.password}
                onChange={(value) => updateField("password", value)}
            />
            <View className="items-start p-4">
                <Button
                    loading={pending}
                    disabled={!isFormTrue}
                    onPress={onSign}
                >
                    Sign In
                </Button>
            </View>
            <View className="flex flex-col gap-4 p-4">
                <Link screen={"Register"} params={{}}>
                    <Text className="font-[NeueMontreal-Medium] color-primary">
                        Sign in with SSO
                    </Text>
                </Link>
                <Text className="font-[NeueMontreal-Medium] color-text">
                    Need an account?{" "}
                    <Link screen={"Register"} params={{}}>
                        <Text className="color-primary">Sign up</Text>
                    </Link>
                </Text>
                <Text className="font-[NeueMontreal-Medium] color-text">
                    Forgot your pssword{" "}
                    <Link screen={"Reset"} params={{}}>
                        <Text className="color-primary">Reset it</Text>
                    </Link>
                </Text>
            </View>

            <View className="flex items-start p-4">
                <RectButton>
                    <View className="flex flex-row items-center gap-4 border border-border p-3">
                        <MaterialCommunityIcons
                            name="google"
                            size={20}
                            color={"#fff"}
                        />
                        <Text className="font-[NeueMontreal-Medium] color-text">
                            Sign in with Google
                        </Text>
                    </View>
                </RectButton>
            </View>
        </ScrollView>
    );
}
