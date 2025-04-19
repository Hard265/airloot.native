import { useEffect, useState } from "react";
import { BackHandler, Button, Modal, Text, View } from "react-native";
import Input from "./Input";

interface PromptProps {
    text: string;
    label: string;
    onConfirm?(value: string): void;
    onCancel?(): void;
    isVisible: boolean;
    onClose?(): void;
}

export default function Prompt({
    label,
    text,
    onCancel,
    onConfirm,
    isVisible,
    onClose,
}: PromptProps) {
    const [input, setInput] = useState("");

    useEffect(() => {
        const handleBackPress = () => {
            if (isVisible) {
                onClose?.();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackPress,
        );
        return () => backHandler.remove();
    }, [isVisible, onClose]);
    return (
        <Modal
            transparent
            visible={isVisible}
            onDismiss={onCancel}
            className="flex-1 items-center justify-center"
        >
            <View className="flex-1 items-center justify-center bg-black/50">
                <View className="w-80 rounded-lg bg-white p-4">
                    <Text className="text-lg">{text}</Text>
                    <Input label={label} value={input} onChange={setInput} />
                    <View className="mt-4 flex-row justify-between">
                        <Button title="Cancel" onPress={onClose} />
                        <Button
                            title="Confirm"
                            onPress={() => {
                                onConfirm?.(input);
                            }}
                        />
                    </View>
                </View>
            </View>
        </Modal>
    );
}
