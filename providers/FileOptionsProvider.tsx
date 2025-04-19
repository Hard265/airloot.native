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
    useEffect,
    useRef,
    useState,
} from "react";
import FolderOptions from "../partials/FolderOptions";
import { BackHandler } from "react-native";

export const FileOptionsContext = createContext<{
    ref: React.RefObject<BottomSheet>;
    folder: Folder | null;
    setFolder(folder: Folder): void;
}>({
    ref: { current: null },
    folder: null,
    setFolder() {},
});

interface Folder {
    name: string;
}

export default function FileOptionsProvider(props: PropsWithChildren) {
    const theme = useTheme();
    const [folder, setFolder] = useState<Folder | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);
    const optionsSheetRef = useRef<BottomSheet>(null);

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

    useEffect(() => {
        const onBackPress = () => {
            if (isSheetOpen) {
                optionsSheetRef.current?.close();
                return true;
            }
            return false;
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            onBackPress,
        );

        return () => backHandler.remove();
    }, [isSheetOpen]);

    const handleSheetChange = (index: number) => {
        setIsSheetOpen(index >= 0);
    };

    return (
        <FileOptionsContext.Provider
            value={{ ref: optionsSheetRef, folder, setFolder }}
        >
            {props.children}
            <BottomSheet
                ref={optionsSheetRef}
                index={-1}
                onChange={handleSheetChange}
                backgroundStyle={{ backgroundColor: theme.colors.notification }}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                handleIndicatorStyle={{ backgroundColor: theme.colors.text }}
            >
                <BottomSheetView>
                    <FolderOptions />
                </BottomSheetView>
            </BottomSheet>
        </FileOptionsContext.Provider>
    );
}
