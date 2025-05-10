import { FeedbackProvider } from "@/providers/FeedbackProvider";
import { PropsWithChildren } from "react";

export default function RootLayout(props: PropsWithChildren) {
    return <FeedbackProvider>{props.children}</FeedbackProvider>;
}
