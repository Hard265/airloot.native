import rootStore from "@/stores/rootStore";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { PropsWithChildren, useCallback, useEffect, useState, createContext } from "react";
import { BackHandler, View } from "react-native";
import FolderOptionsActions from "./FolderOptionsActions";
import FolderOptionsHeader from "./FolderOptionsHeader";

export const FolderOptionsContext = createContext<{
    openOptionsContext: (id: string) => void;
}>({
    openOptionsContext() {
		throw new Error("Not Implemented");		
	}
});


export default function FolderOptions({ children }: PropsWithChildren) {
    const { colors } = useTheme();
    const { uiStore } = rootStore;

	const bottomSheetRef = useRef<BottomSheet>(null);
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

    useEffect(() => {
        const handleBackButtonPress = () => {
            if (isBottomSheetVisible) {
                uiStore.contextMenuRef.current?.close();
                return true;
            }
            return false;
        };

        const backHandlerSubscription = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackButtonPress,
        );

        return () => backHandlerSubscription.remove();
    }, [isBottomSheetVisible, uiStore.contextMenuRef]);

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

	const openOptionsContext = (id: string) => {
		bottomSheetRef.current?.expand();
		uiStore.setDirOptionsContext(id)
	};

	const closeOptionsContext = () => {
		bottomSheetRef.current?.close();
		uiStore.setDirOptionsContext(null);
	}

    return (
        <FolderOptionsContext.Provider value={{
				openOptionsContext
		}}>
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
                </BottomSheetView>
            </BottomSheet>
        <FolderOptionsContext.Provider/>
    );
}
