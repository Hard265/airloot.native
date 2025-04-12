import { useContext } from "react";
import { SessionContext } from "../providers/SessionProvider";

export default function useSession() {
    const ctx = useContext(SessionContext);

    return ctx;
}
