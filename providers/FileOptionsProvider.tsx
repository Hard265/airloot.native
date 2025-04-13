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

export default function FileOptionsProvider(props: PropsWithChildren) {
    const theme = useTheme();
    const [folder, setFolder] = useState<Folder | null>(null);
    const optionsSheetRef = useRef<BottomSheet>(null);

    const openFolderOptions = (folder: Folder) => {
        setFolder(folder);
        optionsSheetRef.current?.expand();
    };

    const renderBackdrop = (props: BottomSheetBackdropProps) => {
        return (
            <BottomSheetBackdrop
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                {...props}
            />
        );
    };
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
                    <View className="flex flex-row p-4">
                        <Text>
                            <Feather name="folder" size={58} />
                        </Text>
                    </View>
                    <RectButton>
                        <View className="flex flex-row gap-2 px-4 py-2">
                            <Feather name="trash-2" size={20} />
                            <Text>Move to trash</Text>
                        </View>
                    </RectButton>
                    <RectButton>
                        <View className="flex flex-row gap-2 px-4 py-2">
                            <Feather name="trash-2" size={20} />
                            <Text>Move to trash</Text>
                        </View>
                    </RectButton>
                    <RectButton>
                        <View className="flex flex-row gap-2 px-4 py-2">
                            <Feather name="trash-2" size={20} />
                            <Text>Move to trash</Text>
                        </View>
                    </RectButton>
                </BottomSheetView>
            </BottomSheet>
        </FileOptionsContext.Provider>
    );
}
