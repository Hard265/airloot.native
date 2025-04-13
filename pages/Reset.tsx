import { ScrollView, View } from "react-native";
import { Heading, Text } from "../components/Text";
import Input from "../components/Input";
import { useState } from "react";

export default function Reset() {
    const [email, setEmail] = useState("");

    return (
        <ScrollView>
            <Heading>Reset Your Password</Heading>
            <View className="p-4">
                <Text className="color-text/75">
                    Enter your email address and we’ll send you a password reset
                    link
                </Text>
            </View>
            <Input label="Email address" value={email} onChange={setEmail} />
        </ScrollView>
    );
}
