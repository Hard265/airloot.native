import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Heading, Link, Text } from "../components/Text";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");

    return (
        <ScrollView>
            <Heading>Create an account</Heading>
            <Input label="Email address" value={email} onChange={setEmail} />
            <View className="flex w-full flex-row items-center">
                <View className="flex-1">
                    <Input
                        label="Password"
                        value={password}
                        onChange={setPassword}
                    />
                </View>
                <View className="flex-1">
                    <Input
                        label="Confirm Password"
                        value={password2}
                        onChange={setPassword2}
                    />
                </View>
            </View>
            <View className="items-start p-4">
                <Button>Register</Button>
            </View>
            <View className="flex-col gap-3 p-4">
                <Text>
                    Already have an account? <Link to="Register">Sign in</Link>
                </Text>
                <Text>
                    Forgot your password <Link to="Reset">Reset it</Link>
                </Text>
            </View>
        </ScrollView>
    );
}
