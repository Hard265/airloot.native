import { useBackHandler } from "@/hooks/useBackHandler";
import Feather from "@expo/vector-icons/Feather";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { noop } from "lodash";
import { useCallback, useRef, useState } from "react";
import { View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, { ZoomInUp, ZoomOutDown } from "react-native-reanimated";
import { Text } from "../components/Text";

enum modes {
    "RENAMING",
}

export default function UploadOptions() {
    const theme = useTheme();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [mode, setMode] = useState<modes | null>(null);

    const renderBottomSheetBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                {...props}
            />
        ),
        [],
    );

    useBackHandler(isBottomSheetVisible, () => {
        bottomSheetRef.current?.close();
        return true;
    });

    const handleBottomSheetVisibilityChange = (index: number) => {
        setIsBottomSheetVisible(index >= 0);
    };

    return (
        <>
            <Animated.View
                entering={ZoomInUp}
                exiting={ZoomOutDown}
                className="absolute bottom-6 right-6"
            >
                <RectButton
                    onPress={() => {
                        bottomSheetRef.current?.expand();
                    }}
                >
                    <View className="elevation-sm flex size-16 items-center justify-center bg-primary">
                        <Feather name="plus" size={24} color={"#fff"} />
                    </View>
                </RectButton>
            </Animated.View>
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                enablePanDownToClose
                onChange={handleBottomSheetVisibilityChange}
                backgroundStyle={{
                    backgroundColor: theme.colors.notification,
                    borderRadius: 0,
                }}
                backdropComponent={renderBottomSheetBackdrop}
                handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
            >
                <BottomSheetView className="">
                    <Animated.View className="flex flex-row justify-evenly p-4">
                        <RectButton onPress={() => setMode(modes.RENAMING)}>
                            <View className="flex-col items-center justify-center gap-3 p-4">
                                <Text>
                                    <Feather name="folder-plus" size={24} />
                                </Text>
                                <Text>Folder</Text>
                            </View>
                        </RectButton>
                        <RectButton onPress={noop}>
                            <View className="flex-col items-center justify-center gap-3 p-4">
                                <Text>
                                    <Feather name="upload-cloud" size={24} />
                                </Text>
                                <Text>Upload</Text>
                            </View>
                        </RectButton>
                        <RectButton onPress={noop}>
                            <View className="flex-col items-center justify-center gap-3 p-4">
                                <Text>
                                    <Feather name="image" size={24} />
                                </Text>
                                <Text>Media</Text>
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
                    </Animated.View>
                    {/* {mode === null && (
                    )} */}
                    {/* {mode === modes.RENAMING && (
                        <UploadOptionsCreate
                            onRequestClose={() => setMode(null)}
                        />
                    )} */}
                </BottomSheetView>
            </BottomSheet>
        </>
    );
}
