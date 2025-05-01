import { HomeStackParamsList } from "@/Router";
import api from "@/services/api";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomSheet, {
    BottomSheetBackdrop,
    BottomSheetBackdropProps,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import { RouteProp, useRoute, useTheme } from "@react-navigation/native";
import dayjs from "dayjs";
import { get } from "lodash";
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useEffect,
    useRef,
    useState,
} from "react";
import { BackHandler, Text, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

// Types and Interfaces
export interface Folder {
    id: string;
    name: string;
    parent_folder: string;
    created_at: string;
}

export interface File {
    id: string;
    name: string;
    folder: Folder | null;
    created_at: string;
}

type PaginationData<T> = {
    count: number;
    next: number | null;
    previous: number | null;
    results: T[];
};

type folderState = {
    meta?: Folder;
    children: PaginationData<Folder>;
    files: PaginationData<File>;
};

export enum ordering {
    "asc" = "asc",
    "desc" = "desc",
}

const initialState: folderState = {
    meta: undefined,
    children: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
    files: {
        count: 0,
        next: null,
        previous: null,
        results: [],
    },
};

// Context Definition
export const FolderOptionsContext = createContext<{
    fetching: boolean;
    state: folderState;
    config: {
        order: ordering;
        setOrder: React.Dispatch<React.SetStateAction<ordering>>;
    };
    context: {
        show: (item: Folder | File) => void;
        hide: () => void;
    };
    rename: {
        id: string | null;
        setId(id: string | null): void;
        onRename(id: string, name: string): void;
    };
}>({
    fetching: false,
    state: initialState,
    config: {
        order: ordering.asc,
        setOrder: () => {
            throw new Error("Function not implemented.");
        },
    },
    context: {
        show: () => {
            throw new Error("Function not implemented.");
        },
        hide: () => {
            throw new Error("Function not implemented.");
        },
    },
    rename: {
        id: null,
        setId: () => {
            throw new Error("Function not implemented.");
        },
        onRename: () => {
            throw new Error("Function not implemented.");
        },
    },
});

// Provider Component
export default function FolderOptionsProvider({ children }: PropsWithChildren) {
    const theme = useTheme();
    const { text: textColor } = theme.colors;

    const route = useRoute<RouteProp<HomeStackParamsList>>();
    const [isFetching, setIsFetching] = useState(false);
    const [context, setContext] = useState<Folder | File | null>(null);
    const [renaming, setRenaming] = useState<string | null>(null);
    const [state, setState] = useState<folderState>(initialState);
    const [order, setOrder] = useState<ordering>(ordering.asc);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const [isBottomSheetVisible, setIsBottomSheetVisible] = useState(false);

    const id = get(route.params, "id", undefined);

    // Effects
    useEffect(() => {
        retrieve();
    }, []);

    useEffect(() => {
        const handleBackButtonPress = () => {
            if (isBottomSheetVisible) {
                bottomSheetRef.current?.close();
                return true;
            }
            return false;
        };

        const backHandlerSubscription = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackButtonPress,
        );

        return () => backHandlerSubscription.remove();
    }, [isBottomSheetVisible]);

    // Handlers
    const handleBottomSheetVisibilityChange = (index: number) => {
        setIsBottomSheetVisible(index >= 0);
    };

    const retrieve = async () => {
        setIsFetching(true);
        try {
            const [req1, req2, req3] = await Promise.all([
                api.get(`/folders/${id}/`),
                api.get(`/folders/${id}/subfolders/`),
                api.get(`/folders/${id}/files/`),
            ]);
            setState({
                meta: req1.data,
                children: req2.data,
                files: req3.data,
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsFetching(false);
        }
    };

    const onRename = async (id: string, name: string) => {
        setRenaming(null);

        try {
            const { data } = await api.put("/folders/" + id + "/", { name });
        } catch (e) {
            console.log(e);
        } finally {
            retrieve();
        }
    };

    const contextOptions = {
        show: (item: Folder | File) => {
            setContext(item);
            bottomSheetRef.current?.expand();
        },
        hide: () => {
            setContext(null);
            bottomSheetRef.current?.close();
        },
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

    // Render
    return (
        <FolderOptionsContext.Provider
            value={{
                fetching: isFetching,
                state,
                config: {
                    order,
                    setOrder,
                },
                context: contextOptions,
                rename: {
                    id: renaming,
                    setId: setRenaming,
                    onRename,
                },
            }}
        >
            {children}
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                onChange={handleBottomSheetVisibilityChange}
                backdropComponent={renderBackdropComponent}
                backgroundStyle={{
                    backgroundColor: theme.colors.notification,
                    borderRadius: 0,
                }}
                handleIndicatorStyle={{
                    backgroundColor: textColor,
                }}
                enablePanDownToClose
            >
                <BottomSheetView>
                    <View>
                        <View className="flex flex-col gap-1 p-4">
                            <Text className="font-[Roobert-Bold] text-2xl color-text">
                                {context?.name}
                            </Text>
                            <View className="flex flex-row items-center justify-between">
                                <Text className="font-[NeueMontreal-Regular] color-text/50">
                                    {dayjs(context?.created_at).format(
                                        "MMM DD, YYYY",
                                    )}
                                </Text>
                                <Text className="font-[NeueMontreal-Regular] color-text/65">
                                    {dayjs(context?.created_at).format(
                                        "[At] HH:mm:ss",
                                    )}
                                </Text>
                            </View>
                        </View>
                        <View className="flex flex-col">
                            <RectButton
                                onPress={() => {
                                    bottomSheetRef.current?.close();
                                    setRenaming(context?.id!);
                                }}
                            >
                                <View className="flex flex-row items-center gap-4 p-4">
                                    <MaterialCommunityIcons
                                        name="rename-box"
                                        size={20}
                                        color={textColor}
                                    />
                                    <Text className="font-[NeueMontreal-Regular] text-lg color-text">
                                        Rename
                                    </Text>
                                </View>
                            </RectButton>
                            <RectButton>
                                <View className="flex flex-row items-center gap-4 p-4">
                                    <Feather
                                        name="copy"
                                        size={20}
                                        color={textColor}
                                    />
                                    <Text className="font-[NeueMontreal-Regular] text-lg color-text">
                                        Copy
                                    </Text>
                                </View>
                            </RectButton>
                            <RectButton>
                                <View className="flex flex-row items-center gap-4 p-4">
                                    <MaterialCommunityIcons
                                        name="link-plus"
                                        size={24}
                                        color={textColor}
                                    />
                                    <Text className="font-[NeueMontreal-Regular] text-lg color-text">
                                        Create link
                                    </Text>
                                </View>
                            </RectButton>
                            <RectButton>
                                <View className="flex flex-row items-center gap-4 p-4">
                                    <Feather
                                        name="download"
                                        size={20}
                                        color={textColor}
                                    />
                                    <Text className="font-[NeueMontreal-Regular] text-lg color-text">
                                        Save to device
                                    </Text>
                                </View>
                            </RectButton>
                            <RectButton>
                                <View className="flex flex-row items-center gap-4 p-4">
                                    <Feather
                                        name="trash-2"
                                        size={20}
                                        color={textColor}
                                    />
                                    <Text className="font-[NeueMontreal-Regular] text-lg color-text">
                                        Permanently delete
                                    </Text>
                                </View>
                            </RectButton>
                        </View>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        </FolderOptionsContext.Provider>
    );
}
