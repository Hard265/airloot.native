import { SessionContext } from "@/providers/Session";
import { useContext } from "react";

export default function useSession() {
    const ctx = useContext(SessionContext);
    return ctx;
}
