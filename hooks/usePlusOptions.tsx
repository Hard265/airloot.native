import { useContext } from "react";
import {
    PlusOptionsContextType,
    PlusOptionsContext,
} from "../providers/PlusOptionsProvider";

export const usePlusOptions = (): PlusOptionsContextType => {
    const context = useContext(PlusOptionsContext);
    if (!context) {
        throw new Error(
            "usePlusOptions must be used within a PlusOptionsProvider",
        );
    }
    return context;
};
