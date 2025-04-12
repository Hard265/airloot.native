import { ScrollView } from "react-native";
import { Heading, Text } from "../components/Text";
import Input from "../components/Input";

export default function Reset() {
    return (
        <ScrollView>
            <Heading>Reset Your Password</Heading>
            <Text>
                Enter your email address and we’ll send you a password reset
                link
            </Text>
            <Input label="Email address" />
        </ScrollView>
    );
}
