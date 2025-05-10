import BottomSheet from "@gorhom/bottom-sheet";
import React, {
    createContext,
    PropsWithChildren,
    ReactNode,
    useState,
} from "react";
import { Modal, Pressable, Text, View } from "react-native";

type alertProps = {
    title: string;
    message: string | ReactNode;
    actions: [string, string];
};

interface FeedbackContextType {
    alert(props: alertProps): Promise<boolean>;
}

export const FeedbackContext = createContext<FeedbackContextType | undefined>(
    undefined,
);

type FeedbackProviderProps = PropsWithChildren;

export const FeedbackProvider: React.FC<FeedbackProviderProps> = ({
    children,
}) => {
    const [alertData, setAlertData] = useState<alertProps | null>(null);
    const [alertResolver, setAlertResolver] = useState<
        ((value: boolean) => void) | null
    >(null);

    const alert = (props: alertProps): Promise<boolean> => {
        setAlertData(props);
        return new Promise((resolver) => {
            setAlertResolver(() => resolver);
        });
    };

    const alertResponseHandler = (data: boolean) => {
        setAlertData(null);
        alertResolver?.(data);
    };

    return (
        <FeedbackContext.Provider value={{ alert }}>
            {children}
            {renderFeedbackAlert(alertData, alertResponseHandler)}
        </FeedbackContext.Provider>
    );
};

function renderFeedbackAlert(
    alertData: alertProps | null,
    alertResponseHandler: (data: boolean) => void,
) {
    return (
        <BottomSheet index={-1}>
            <Modal
                transparent
                statusBarTranslucent
                animationType="fade"
                visible={!!alertData}
                onRequestClose={() => alertResponseHandler(false)}
                onDismiss={() => alertResponseHandler(false)}
            >
                <View className="overlay-backdrop">
                    <View className="flex w-full flex-col gap-4 bg-secondary p-4 pb-1 sm:w-80">
                        <Text className="h3">{alertData?.title}</Text>
                        <Text className="p text-lg">{alertData?.message}</Text>
                        <View className="row justify-end">
                            <Pressable
                                onPress={() => alertResponseHandler(false)}
                            >
                                <View className="btn-text">
                                    <Text className="label text-primary">
                                        {alertData?.actions[1]}
                                    </Text>
                                </View>
                            </Pressable>
                            <Pressable
                                onPress={() => alertResponseHandler(true)}
                            >
                                <View className="btn-text">
                                    <Text className="label text-error">
                                        {alertData?.actions[0]}
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
        </BottomSheet>
    );
}
