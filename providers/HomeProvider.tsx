import api from "@/services/api";
import { createContext, PropsWithChildren, useEffect, useState } from "react";

interface Folder {
    id: string;
    created_at: string;
    name: string;
    parent_folder: Folder | null;
}

interface File {
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
type homeState = {
    children: PaginationData<Folder>;
    files: PaginationData<File>;
};
const initialState: homeState = {
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

export const HomeContext = createContext<{
    fetching: boolean;
    folder: homeState;
}>({
    fetching: false,
    folder: initialState,
});

export default function HomeProvider({ children }: PropsWithChildren) {
    const [fetching, setFetching] = useState(false);

    const [state, setState] = useState<homeState>(initialState);

    useEffect(() => {
        fetch();
    }, []);

    const fetch = async () => {
        setFetching(true);
        try {
            const [req1, req2] = await Promise.all([
                api.get("/folders/"),
                api.get("/files/"),
            ]);
            setState(() => ({
                children: req1.data,
                files: req2.data,
            }));
        } catch (error) {
            console.log(error);
        } finally {
            setFetching(false);
        }
    };

    return (
        <HomeContext.Provider value={{ fetching, folder: state }}>
            {children}
        </HomeContext.Provider>
    );
}
