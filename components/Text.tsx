import { PropsWithChildren } from "react";
import { Text as TextDefault, TextProps } from "react-native";
import { Link as RouterLink } from "@react-navigation/native";
import { RootStackParamsList } from "../Router";

export const Text = (props: TextProps) => {
    return (
        <TextDefault className="color-text" {...props}>
            {props.children}
        </TextDefault>
    );
};

export const Heading = (props: TextProps) => {
    return (
        <TextDefault className="color-text p-4 text-4xl" {...props}>
            {props.children}
        </TextDefault>
    );
};

export const Title = (props: TextProps) => {
    return (
        <TextDefault className="color-text text-2xl font-medium" {...props}>
            {props.children}
        </TextDefault>
    );
};

interface LinkProps extends PropsWithChildren {
    to: keyof RootStackParamsList;
    params?: {
        [key: string]: any;
    };
}

export const Link = (props: LinkProps) => {
    return (
        <RouterLink screen={props.to} params={props.params || {}}>
            <TextDefault className="color-primary">
                {props.children}
            </TextDefault>
        </RouterLink>
    );
};
