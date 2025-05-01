import { TextButton } from "@/components/Button";
import Input from "@/components/Input";
import api from "@/services/api";
import clsx from "clsx";
import React, { useState } from "react";
import { Text } from "react-native";
import { View } from "react-native";

interface UploadOptionsCreateProps {
    onRequestClose(): void;
}

export default function UploadOptionsCreate(props: UploadOptionsCreateProps) {
    const [input, setInput] = useState("");

    const onConfirm = async () => {
        try {
            const { data } = await api.post("/folders/", { name: input });
            props.onRequestClose();
        } catch (error) {}
    };

    return (
        <View>
            <Input
                label="Name"
                value={input}
                autoFocus
                selectTextOnFocus
                onChange={setInput}
            />
            <View className="flex flex-row items-center justify-end gap-8 p-6">
                <TextButton onPress={props.onRequestClose}>Cancel</TextButton>
                <TextButton disabled={!input} onPress={onConfirm}>
                    OK
                </TextButton>
            </View>
        </View>
    );
}
