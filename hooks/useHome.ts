import { HomeContext } from "@/providers/HomeProvider";
import { useContext } from "react";

export default function useHome() {
    const ctx = useContext(HomeContext);
    if (!ctx) throw new Error("useHome hook usage violation");
    return ctx;
}
