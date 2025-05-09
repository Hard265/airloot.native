import { usePlusOptions } from "@/hooks/usePlusOptions";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { capitalize } from "lodash";
import { Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";

type option = {
    title: string;
    icon: keyof typeof Feather.glyphMap;
    action(): void;
};

export default function PlusOptions() {
    const { colors } = useTheme();
    const { hide } = usePlusOptions();

    const options: option[] = [
        {
            title: "folder",
            icon: "folder-plus",
            action: function (): void {
                throw new Error("Function not implemented.");
            },
        },
        {
            title: "upload",
            icon: "upload",
            action: async function (): Promise<void> {
                DocumentPicker.getDocumentAsync({
                    multiple: true,
                    type: "*/*",
                });
            },
        },
        {
            title: "Camera",
            icon: "camera",
            action: function (): void {
                ImagePicker.launchCameraAsync({
                    allowsEditing: true,
                    exif: true,
                });
            },
        },
        {
            title: "photos",
            icon: "image",
            action: function (): void {
                ImagePicker.launchImageLibraryAsync({
                    allowsMultipleSelection: true,
                    mediaTypes: ["images"],
                    presentationStyle:
                        ImagePicker.UIImagePickerPresentationStyle.AUTOMATIC,
                    exif: true,
                    allowsEditing: true,
                });
            },
        },
        {
            title: "videos",
            icon: "video",
            action: function (): void {
                ImagePicker.launchImageLibraryAsync({
                    allowsMultipleSelection: true,
                    mediaTypes: ["videos"],
                    presentationStyle:
                        ImagePicker.UIImagePickerPresentationStyle.AUTOMATIC,
                    exif: true,
                    allowsEditing: true,
                });
            },
        },
        {
            title: "scan",
            icon: "camera",
            action: function (): void {
                throw new Error("Function not implemented.");
            },
        },
    ];

    const handleOptionSelect = (fn: () => void) => {
        hide();
        fn();
    };
    return (
        <View className="row flex-wrap justify-evenly p-4">
            {options.map((props) => (
                <RectButton
                    key={props.title}
                    onPress={() => handleOptionSelect(props.action)}
                >
                    <View className="col items-center p-4">
                        <Feather
                            name={props.icon}
                            size={24}
                            color={colors.text}
                        />
                        <Text className="font-[NeueMontreal-Medium] color-text">
                            {capitalize(props.title)}
                        </Text>
                    </View>
                </RectButton>
            ))}
        </View>
    );
}
