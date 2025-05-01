import { Feather } from "@expo/vector-icons";
import { ScrollView, View, Text } from "react-native";

export default function ResetLinkSent() {
    return (
        <ScrollView>
            <View className="items-center p-4">
                <Feather name="link-2" size={80} color={"#4CAF50"} />
                <Text className="mt-4 text-center font-[NeueMontreal-Medium] color-text">
                    A password reset link has been sent to your email. Please
                    check your inbox and follow the instructions to reset your
                    password.
                </Text>
            </View>
        </ScrollView>
    );
}
