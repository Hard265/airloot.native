import { Feather } from "@expo/vector-icons";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { createContext, PropsWithChildren, useRef, useState } from "react";
import { View } from "react-native";
import { Text } from "../components/Text";
import { RectButton } from "react-native-gesture-handler";

export const FileOptionsContext = createContext<{
    openFolderOptions(folder: Folder): void;
}>({ openFolderOptions() {} });

interface Folder {
    name: string;
}

interface Option {
    icon: keyof typeof Feather.glyphMap;
    label: string;
    onPress: () => void;
}

export default function FileOptionsProvider(props: PropsWithChildren) {
    const theme = useTheme();
    const [folder, setFolder] = useState<Folder | null>(null);
    const optionsSheetRef = useRef<BottomSheet>(null);

    const openFolderOptions = (folder: Folder) => {
        setFolder(folder);
        optionsSheetRef.current?.expand();
    };

    const renderBackdrop = (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
            appearsOnIndex={0}
            disappearsOnIndex={-1}
            {...props}
        />
    );

    const folderOptions: Option[] = [
        {
            icon: "trash-2",
            label: "Move to trash",
            onPress: () =>
                console.log(`Moving folder "${folder?.name}" to trash`),
        },
        {
            icon: "edit",
            label: "Rename folder",
            onPress: () => console.log(`Renaming folder "${folder?.name}"`),
        },
        {
            icon: "share-2",
            label: "Share folder",
            onPress: () => console.log(`Sharing folder "${folder?.name}"`),
        },
    ];

    const renderOption = ({ icon, label, onPress }: Option, index: number) => (
        <RectButton
            key={index}
            onPress={onPress}
            style={{ paddingHorizontal: 16, paddingVertical: 12 }}
        >
            <View className="flex flex-row items-center gap-2">
                <Feather name={icon} size={20} color={theme.colors.text} />
                <Text>{label}</Text>
            </View>
        </RectButton>
    );

    return (
        <FileOptionsContext.Provider value={{ openFolderOptions }}>
            {props.children}
            <BottomSheet
                ref={optionsSheetRef}
                index={-1}
                backgroundStyle={{ backgroundColor: theme.colors.notification }}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
            >
                <BottomSheetView>
                    <View className="flex flex-row items-center p-4">
                        <Feather
                            name="folder"
                            size={58}
                            color={theme.colors.text}
                        />
                        <Text className="ml-4 text-lg font-bold">
                            {folder?.name || "Folder Options"}
                        </Text>
                    </View>
                    {folderOptions.map(renderOption)}
                </BottomSheetView>
            </BottomSheet>
        </FileOptionsContext.Provider>
    );
}
