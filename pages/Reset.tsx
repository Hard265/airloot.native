import Button from "@/components/Button";
import useSession from "@/hooks/useSession";
import { get } from "lodash";
import { useState } from "react";
import { ScrollView, Text, View } from "react-native";
import Input from "../components/Input";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamsList } from "@/Router";

type ScreenProps = StackScreenProps<RootStackParamsList, "Reset">;

export default function Reset({ navigation }: ScreenProps) {
    const { resetPassword } = useSession();
    const [pending, setPending] = useState(false);
    const [formState, setFormState] = useState({
        email: "",
    });

    const [errors, setErrors] = useState({
        email: [],
    });

    const onSubmit = async () => {
        setPending(true);
        try {
            await resetPassword(formState.email);
            navigation.navigate("ResetLinkSent");
        } catch (err: any) {
            setErrors((prevState) => ({
                ...prevState,
                email: get(err, "response.data.email", []),
            }));
        } finally {
            setPending(false);
        }
    };

    const isFormTrue = Object.values(errors).every(Boolean);
    const onChangleForm = (field: keyof typeof formState, value: string) => {
        setErrors((prevState) => ({ ...prevState, [field]: [] }));
        setFormState((prevState) => ({ ...prevState, [field]: value }));
    };

    return (
        <ScrollView>
            <Text className="p-4 font-[Roobert-Heavy] text-3xl color-text">
                Reset your password
            </Text>
            <View className="p-4">
                <Text className="font-[NeueMontreal-Medium] text-base color-text/75">
                    Enter your email address and we’ll send you a password reset
                    link
                </Text>
            </View>
            <Input
                label="Email address"
                value={formState.email}
                errors={errors.email}
                onChange={(value) => onChangleForm("email", value)}
            />
            <View className="items-start p-4">
                <Button
                    loading={pending}
                    disabled={pending || !isFormTrue}
                    onPress={onSubmit}
                >
                    Send Reset Link
                </Button>
            </View>
        </ScrollView>
    );
}
