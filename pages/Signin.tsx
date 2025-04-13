import { useState } from "react";
import { ScrollView, View } from "react-native";
import { Heading, Link, Text } from "../components/Text";
import Input from "../components/Input";
import Button from "../components/Button";
import useSession from "../hooks/useSession";

export default function Signin() {
    const { signIn } = useSession();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSign = () => {
        signIn({ email, password });
    };

    return (
        <ScrollView>
            <Heading>Sign In</Heading>
            <Input label="Email address" value={email} onChange={setEmail} />
            <Input label="Password" value={password} onChange={setPassword} />
            <View className="items-start p-4">
                <Button onPress={onSign}>Sign In</Button>
            </View>
            <View className="flex flex-col gap-4 p-4">
                <Link to="SignIn">Sign in with SSO</Link>
                <Text>
                    Need an account? <Link to="Register">Sign up</Link>
                </Text>
                <Text>
                    Forgot your password <Link to="SignIn">Reset it</Link>
                </Text>
            </View>
        </ScrollView>
    );
}
