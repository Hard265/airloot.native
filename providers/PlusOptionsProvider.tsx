import { useBackHandler } from "@/hooks/useBackHandler";
import PlusFab from "@/widgets/PlusFab";
import PlusOptions from "@/widgets/PlusOptions";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import React, {
    createContext,
    PropsWithChildren,
    useCallback,
    useRef,
    useState,
} from "react";
import { View } from "react-native";

export interface PlusOptionsContextType {
    show: () => void;
    hide: () => void;
}

export const PlusOptionsContext = createContext<
    PlusOptionsContextType | undefined
>(undefined);

export const PlusOptionsProvider = ({ children }: PropsWithChildren) => {
    const { colors } = useTheme();

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

    const handleBottomSheetVisibilityChange = (index: number) => {
        setIsBottomSheetVisible(index >= 0);
    };

    useBackHandler(isBottomSheetVisible, () => {
        bottomSheetRef.current?.close();
        return true;
    });
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

    const show = () => bottomSheetRef.current?.expand();
    const hide = () => bottomSheetRef.current?.close();

    return (
        <PlusOptionsContext.Provider value={{ show, hide }}>
            <View className="relative flex-1">
                {children}
                <PlusFab />
            </View>
            <BottomSheet
                ref={bottomSheetRef}
                backgroundStyle={{
                    borderRadius: 0,
                    backgroundColor: colors.notification,
                }}
                handleIndicatorStyle={{ backgroundColor: colors.text }}
                onChange={handleBottomSheetVisibilityChange}
                backdropComponent={renderBackdropComponent}
                enablePanDownToClose
                index={-1}
            >
                <BottomSheetView>
                    <PlusOptions />
                </BottomSheetView>
            </BottomSheet>
        </PlusOptionsContext.Provider>
    );
};
