import { Modal, Pressable, Text, View } from "react-native";

interface PromptProps {
    message: string;
    visible: boolean;
    cancelLabel?: string;
    confirmLabel?: string;
    onResponse: (response: boolean) => void;
}

export default function Prompt(props: PromptProps) {
    const cancelLabel = props.cancelLabel || "Cancel";
    const confirmLabel = props.confirmLabel || "Confirm";

    return (
        <Modal
            transparent
            visible={props.visible}
            animationType="fade"
            statusBarTranslucent
            onDismiss={() => props.onResponse(false)}
            onRequestClose={() => props.onResponse(false)}
            className="flex-1 items-center justify-center"
        >
            <View className="flex-1 items-center justify-center bg-black/50 p-4">
                <View className="flex flex-col gap-4 bg-secondary p-4 pb-1 sm:max-w-80">
                    <Text className="self-start font-[Roobert-SemiBold] text-xl text-text">
                        Alert
                    </Text>
                    <Text className="font-[NeueMontreal-Regular] text-lg color-text">
                        {props.message}
                    </Text>
                    <View className="flex-row items-center justify-end gap-4">
                        <Pressable
                            onPress={() => props.onResponse(false)}
                            className="p-2"
                        >
                            <Text className="px-2 font-[NeueMontreal-Medium] text-lg text-primary">
                                {cancelLabel}
                            </Text>
                        </Pressable>
                        <Pressable
                            onPress={() => props.onResponse(true)}
                            className="p-2"
                        >
                            <Text className="px-2 font-[NeueMontreal-Medium] text-lg text-error">
                                {confirmLabel}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
