import { useBackHandler } from "@/hooks/useBackHandler";
import FolderOptions from "@/widgets/FolderOptions";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useRef,
    useState,
} from "react";
import type { FileSystemEntity, FolderOptionsContextType } from "../types";

export const FolderOptionsContext = createContext<FolderOptionsContextType>({
    openBottomSheet: () => {},
    closeBottomSheet: () => {},
    selectedItem: null,
    isBottomSheetVisible: false,
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
                isBottomSheetVisible,
            }}
        >
            {children}
            <BottomSheet
                ref={bottomSheetRef}
                backgroundStyle={{
                    backgroundColor: colors.notification,
                    borderRadius: 0,
                }}
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
