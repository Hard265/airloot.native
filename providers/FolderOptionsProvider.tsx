import Prompt from "@/components/Prompt";
import { useBackHandler } from "@/hooks/useBackHandler";
import rootStore from "@/stores/rootStore";
import FolderOptionsActions from "@/widgets/FolderOptionsActions";
import FolderOptionsHeader from "@/widgets/FolderOptionsHeader";
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
import { View } from "react-native";

export const FolderOptionsContext = createContext<{
    openOptionsContext(id: string, type: "file" | "folder"): void;
    closeOptionsContext(): void;
    showPrompt(options: {
        message: string;
        cancelLabel?: string;
        confirmLabel?: string;
    }): Promise<boolean>;
}>({
    openOptionsContext: function (id: string): void {
        throw new Error("Function not implemented.");
    },
    closeOptionsContext: function (): void {
        throw new Error("Function not implemented.");
    },
    showPrompt: function (): Promise<boolean> {
        throw new Error("Function not implemented.");
    },
});

export default function FolderOptionsProvider({ children }: PropsWithChildren) {
    const { colors } = useTheme();
    const { uiStore } = rootStore;

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

    const [modalData, setModalData] = useState<{
        message: string;
        cancelLabel?: string;
        confirmLabel?: string;
    } | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [resolveModal, setResolveModal] = useState<
        ((value: boolean) => void) | null
    >(null);

    const showPrompt = ({
        message,
        cancelLabel = "Cancel",
        confirmLabel = "Confirm",
    }: {
        message: string;
        cancelLabel?: string;
        confirmLabel?: string;
    }): Promise<boolean> => {
        setModalData({ message, cancelLabel, confirmLabel });
        setModalVisible(true);
        return new Promise((resolve) => {
            setResolveModal(() => resolve);
        });
    };

    const handleModalResponse = (response: boolean) => {
        setModalVisible(false);
        setModalData(null);
        resolveModal?.(response);
        setResolveModal(null);
    };

    useBackHandler(isBottomSheetVisible, () => {
        bottomSheetRef.current?.close();
        return true;
    });

    const handleBottomSheetVisibilityChange = (index: number) => {
        setIsBottomSheetVisible(index >= 0);
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

    const openOptionsContext = (id: string, type: "file" | "folder") => {
        switch (type) {
            case "file":
                uiStore.setFileOptionsContext(id);
                break;
            case "folder":
                uiStore.setDirOptionsContext(id);
                break;
        }
        bottomSheetRef.current?.expand();
    };

    const clearContextOptions = () => {
        uiStore.setDirOptionsContext(null);
        uiStore.setFileOptionsContext(null);
    };

    const closeOptionsContext = () => {
        bottomSheetRef.current?.close();
        clearContextOptions();
    };

    return (
        <FolderOptionsContext.Provider
            value={{
                openOptionsContext,
                closeOptionsContext,
                showPrompt,
            }}
        >
            {children}
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                onChange={handleBottomSheetVisibilityChange}
                backdropComponent={renderBackdropComponent}
                backgroundStyle={{
                    backgroundColor: colors.notification,
                    borderRadius: 0,
                }}
                onClose={clearContextOptions}
                handleIndicatorStyle={{
                    backgroundColor: colors.text,
                }}
                enablePanDownToClose
            >
                <BottomSheetView>
                    <View>
                        <FolderOptionsHeader />
                        <FolderOptionsActions />
                    </View>
                    <Prompt
                        visible={modalVisible}
                        message={modalData?.message || ""}
                        cancelLabel={modalData?.cancelLabel}
                        confirmLabel={modalData?.confirmLabel}
                        onResponse={handleModalResponse}
                    />
                </BottomSheetView>
            </BottomSheet>
        </FolderOptionsContext.Provider>
    );
}
