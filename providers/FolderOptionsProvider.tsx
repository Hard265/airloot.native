import { useBackHandler } from "@/hooks/useBackHandler";
import { Dir } from "@/stores/dirStore";
import { File } from "@/stores/fileStore";
import FolderOptions from "@/widgets/FolderOptions";
import { Feather } from "@expo/vector-icons";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { usePreventRemove, useTheme } from "@react-navigation/native";
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useRef,
    useState,
} from "react";
import { Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

type FileSystemEntity = File | Dir;

export const FolderOptionsContext = createContext<{
    openBottomSheet: (item: FileSystemEntity) => void;
    closeBottomSheet: () => void;
    selectedItem: FileSystemEntity | null;
}>({
    openBottomSheet: () => {},
    closeBottomSheet: () => {},
    selectedItem: null,
});

export default function FolderOptionsProvider({ children }: PropsWithChildren) {
    const { colors } = useTheme();

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState<FileSystemEntity | null>(
        null,
    );

    const handleBottomSheetVisibilityChange = (index: number) => {
        setIsBottomSheetVisible(index >= 0);
    };

    useBackHandler(isBottomSheetVisible, () => {
        bottomSheetRef.current?.close();
        return true;
    });

    const openBottomSheet = (item: FileSystemEntity) => {
        setSelectedItem(item);
        bottomSheetRef.current?.snapToIndex(0);
    };

    const closeBottomSheet = () => {
        bottomSheetRef.current?.close();
        setSelectedItem(null);
    };

    const renderBackdropComponent = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                {...props}
            />
        ),
        [],
    );

    return (
        <FolderOptionsContext.Provider
            value={{
                openBottomSheet,
                closeBottomSheet,
                selectedItem,
            }}
        >
            {children}
            <BottomSheet
                ref={bottomSheetRef}
                backgroundStyle={{ backgroundColor: colors.notification }}
                handleIndicatorStyle={{ backgroundColor: colors.text }}
                onChange={handleBottomSheetVisibilityChange}
                backdropComponent={renderBackdropComponent}
                index={-1}
                enablePanDownToClose
            >
                <BottomSheetView>
                    <FolderOptions />
                </BottomSheetView>
            </BottomSheet>
        </FolderOptionsContext.Provider>
    );
}
