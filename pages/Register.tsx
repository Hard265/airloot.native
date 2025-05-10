import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Link } from "@react-navigation/native";
import { get, isEmpty, pick } from "lodash";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Button from "../components/Button";
import Input from "../components/Input";
import useSession from "@/hooks/useSession";

type formType = {
    email: string[];
    password: string[];
    password2: string[];
};

export default function Register() {
    const { signUp } = useSession();
    const [pending, setPending] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        password2: "",
    });

    const [errors, setErrors] = useState<formType>({
        email: [],
        password: [],
        password2: [],
    });

    const handleChange = (
        field: keyof (typeof formData & typeof errors),
        value: string,
    ) => {
        if (!isEmpty(errors[field]))
            setErrors((prev) => ({ ...prev, [field]: [] }));
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const isFormTrue = Object.values(formData).every(Boolean);

    const onSignup = async () => {
        setPending(true);

        if (formData.password !== formData.password2) {
            setErrors((e) => ({
                ...e,
                password2: ["Passwords do not match"],
            }));
            setPending(false);
            return;
        }

        try {
            await signUp(pick(formData, ["email", "password"]));
            console.log("created");
        } catch (err: any) {
            setErrors((e) => ({
                ...e,
                email: get(err, "response.data.email", []),
                password: get(err, "response.data.password", []),
            }));
        } finally {
            setPending(false);
        }
    };

    return (
        <ScrollView>
            <>
                <Text className="p-4 font-[Roobert-Heavy] text-3xl color-text">
                    Create an account
                </Text>
                <Input
                    label="Email address"
                    value={formData.email}
                    type="email-address"
                    onChange={(value) => handleChange("email", value)}
                    errors={errors.email}
                />
                <View className="flex w-full flex-row items-start">
                    <View className="flex-1">
                        <Input
                            label="Password"
                            value={formData.password}
                            onChange={(value) =>
                                handleChange("password", value)
                            }
                            secureTextEntry
                            errors={errors.password}
                        />
                    </View>
                    <View className="flex-1">
                        <Input
                            label="Confirm Password"
                            value={formData.password2}
                            errors={errors.password2}
                            secureTextEntry
                            onChange={(value) =>
                                handleChange("password2", value)
                            }
                        />
                    </View>
                </View>
                <View className="items-start p-4">
                    <Button
                        loading={pending}
                        onPress={onSignup}
                        disabled={!isFormTrue}
                    >
                        Register
                    </Button>
                </View>
                <View className="flex-col gap-3 p-4">
                    <Text className="font-[NeueMontreal-Medium] color-text">
                        Already have an account?{" "}
                        <Link screen={"Register"} params={{}}>
                            <Text className="color-primary">Sign in</Text>
                        </Link>
                    </Text>
                    <Text className="font-[NeueMontreal-Medium] color-text">
                        Forgot your password?{" "}
                        <Link screen={"Reset"} params={{}}>
                            <Text className="color-primary">Reset in</Text>
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
                                Continue with Google
                            </Text>
                        </View>
                    </RectButton>
                </View>
            </>
        </ScrollView>
    );
}
