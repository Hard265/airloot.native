import Input from "@/components/Input";
import { usePlusOptions } from "@/hooks/usePlusOptions";
import rootStore from "@/stores/rootStore";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@react-navigation/native";
import { AxiosError } from "axios";
import * as DocumentPicker from "expo-document-picker";
import * as ImagePicker from "expo-image-picker";
import { capitalize, uniqueId } from "lodash";
import { createContext, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

type option = {
    title: string;
    icon: keyof typeof Feather.glyphMap;
    action(): void;
};

const PlusOptionsContext = createContext({});

export default function PlusOptions() {
    const { colors } = useTheme();
    const { hide: hideOptionsModal } = usePlusOptions();

    const [isNewFolderVisible, setIsNewFolderVisible] = useState(false);
    const thisFolder = rootStore.dirStore.currentDir?.id || null;

    const options: option[] = [
        {
            title: "folder",
            icon: "folder-plus",
            action: () => {
                setIsNewFolderVisible(true);
            },
        },
        {
            title: "upload",
            icon: "upload",
            action: async function (): Promise<void> {
                const result = await DocumentPicker.getDocumentAsync({
                    multiple: true,
                    type: "*/*",
                });
                if (result.canceled) return;
                hideOptionsModal();
                const files = result.assets.map((file) => ({
                    name: file.name,
                    file: {
                        uri: file.uri,
                        name: file.name,
                        type: file.mimeType,
                    },
                    folder: thisFolder,
                }));

                await rootStore.fileStore.upload(files);
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

    const handleOptionSelect = (fn: () => void, shouldHide?: boolean) => {
        if (shouldHide) hideOptionsModal();
        fn();
    };

    return (
        <PlusOptionsContext.Provider value={{}}>
            {isNewFolderVisible ? (
                <NewFolderInput
                    dismiss={() => {
                        setIsNewFolderVisible(false);
                    }}
                />
            ) : (
                <View className="row flex-wrap justify-evenly p-4">
                    {options.map((props) => (
                        <RectButton
                            key={props.title}
                            onPress={() =>
                                handleOptionSelect(props.action, false)
                            }
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
            )}
        </PlusOptionsContext.Provider>
    );
}

function NewFolderInput(props: { dismiss(): void }) {
    const { dirStore } = rootStore;
    const thisFolder = rootStore.dirStore.currentDir?.id || null;
    const theme = useTheme();
    const { hide: hidePlusOptions } = usePlusOptions();

    const [name, setName] = useState("folder");
    const [errors, setErrors] = useState<{ name?: string[] }>({ name: [] });
    const [pending, setPending] = useState(false);

    const handleOnInput = (text: string) => {
        if (!!Object.values(errors).length) setErrors({});
        setName(text);
    };

    const handleSubmit = async () => {
        setPending(true);
        try {
            await dirStore.create({
                name,
                parent_folder: thisFolder,
            });
            props.dismiss();
            hidePlusOptions();
        } catch (err: any) {
            const e = err as AxiosError;
            if (e.status === 400) setErrors(e.response?.data || {});
        } finally {
            setPending(false);
        }
    };

    return (
        <View className="col gap-0">
            <Input
                value={name}
                onChange={handleOnInput}
                label="Name"
                autoFocus
                errors={errors.name}
                selectTextOnFocus
            />
            <View className="row justify-end px-4 py-0">
                <TouchableOpacity className="btn-text" onPress={props.dismiss}>
                    <Text className="label">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity className="btn-text" onPress={handleSubmit}>
                    {pending && (
                        <ActivityIndicator
                            size="small"
                            color={theme.colors.primary}
                        />
                    )}
                    <Text className="label text-primary">Create</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
