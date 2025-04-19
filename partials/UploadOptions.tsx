import Input from "@/components/Input";
import Feather from "@expo/vector-icons/Feather";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { useCallback, useEffect, useRef, useState } from "react";
import { BackHandler, Text as NativeText, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, { ZoomInUp, ZoomOutDown } from "react-native-reanimated";
import { Text } from "../components/Text";

export default function UploadOptions() {
    const theme = useTheme();
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [isFolderCreationMode, setIsFolderCreationMode] = useState(false);
    const [newFolderName, setNewFolderName] = useState("New Folder");

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

    useEffect(() => {
        const handleBackButtonPress = () => {
            if (isBottomSheetVisible) {
                bottomSheetRef.current?.close();
                return true;
            }
            return false;
        };

        const backHandlerSubscription = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackButtonPress,
        );

        return () => backHandlerSubscription.remove();
    }, [isBottomSheetVisible]);

    const handleBottomSheetVisibilityChange = (index: number) => {
        setIsBottomSheetVisible(index >= 0);
    };

    const handleDocumentSelection = () => {
        DocumentPicker.getDocumentAsync({
            copyToCacheDirectory: false,
            multiple: true,
            type: "*/*",
        }).then((document) => {
            console.log(document.assets);
        });
    };

    const handleCameraLaunch = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "videos", "livePhotos"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        if (!result.canceled) {
            console.log(result.assets);
        }
    };

    const handleFolderCreation = () => {
        if (newFolderName.trim()) {
            console.log("Create folder with name:", newFolderName);
            setNewFolderName("");
            setIsFolderCreationMode(false);
        } else {
            console.log("Folder name cannot be empty");
        }
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
                    {!isFolderCreationMode && (
                        <Animated.View className="flex flex-row justify-evenly p-4">
                            <RectButton
                                onPress={() => setIsFolderCreationMode(true)}
                            >
                                <View className="flex-col items-center justify-center gap-3 p-4">
                                    <Text>
                                        <Feather name="folder-plus" size={24} />
                                    </Text>
                                    <Text>Folder</Text>
                                </View>
                            </RectButton>
                            <RectButton onPress={handleDocumentSelection}>
                                <View className="flex-col items-center justify-center gap-3 p-4">
                                    <Text>
                                        <Feather
                                            name="upload-cloud"
                                            size={24}
                                        />
                                    </Text>
                                    <Text>Upload</Text>
                                </View>
                            </RectButton>
                            <RectButton onPress={handleCameraLaunch}>
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
                    )}
                    {isFolderCreationMode && (
                        <View>
                            <Input
                                label="Name"
                                value={newFolderName}
                                autoFocus
                                selectTextOnFocus
                                onChange={setNewFolderName}
                            />
                            <View className="flex flex-row items-center justify-end gap-8 p-6">
                                <NativeText
                                    className="text-lg font-medium text-primary"
                                    onPress={() =>
                                        setIsFolderCreationMode(false)
                                    }
                                >
                                    Cancel
                                </NativeText>
                                <NativeText
                                    className="text-lg font-medium text-primary"
                                    onPress={handleFolderCreation}
                                >
                                    OK
                                </NativeText>
                            </View>
                        </View>
                    )}
                </BottomSheetView>
            </BottomSheet>
        </>
    );
}
