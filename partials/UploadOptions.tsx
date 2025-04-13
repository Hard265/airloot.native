import Feather from "@expo/vector-icons/Feather";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useRef } from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import * as DocumentPicker from "expo-document-picker";
import { Text } from "../components/Text";
import { useTheme } from "@react-navigation/native";

export default function UploadOptions() {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const theme = useTheme();
    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                {...props}
            />
        ),
        [],
    );

    const pickDocumentHandler = () => {
        DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: false,
            multiple: true,
            type: "*/*",
        }).then((document) => {
            console.log(document.assets);
        });
    };
    return (
        <>
            <Animated.View className="absolute bottom-6 right-6">
                <RectButton
                    onPress={() => {
                        bottomSheetRef.current?.expand();
                    }}
                >
                    <View className="elevation-sm flex size-16 items-center justify-center rounded-2xl bg-primary">
                        <Feather name="plus" size={24} color={"#fff"} />
                    </View>
                </RectButton>
            </Animated.View>
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                enablePanDownToClose
                backgroundStyle={{ backgroundColor: theme.colors.notification }}
                backdropComponent={renderBackdrop}
                handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
            >
                <BottomSheetView>
                    <View className="flex flex-row justify-evenly p-4">
                        <RectButton>
                            <View className="flex-col items-center justify-center gap-3 p-4">
                                <Text>
                                    <Feather name="folder-plus" size={24} />
                                </Text>
                                <Text>Folder</Text>
                            </View>
                        </RectButton>

                        <RectButton onPress={pickDocumentHandler}>
                            <View className="flex-col items-center justify-center gap-3 p-4">
                                <Text>
                                    <Feather name="upload-cloud" size={24} />
                                </Text>
                                <Text>Upload</Text>
                            </View>
                        </RectButton>
                        <RectButton>
                            <View className="flex-col items-center justify-center gap-3 p-4">
                                <Text>
                                    <Feather name="camera" size={24} />
                                </Text>
                                <Text>Camera</Text>
                            </View>
                        </RectButton>
                        <RectButton>
                            <View className="flex-col items-center justify-center gap-3 p-4">
                                <Text>
                                    <Feather name="user-plus" size={24} />
                                </Text>
                                <Text>User</Text>
                            </View>
                        </RectButton>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </>
    );
}
