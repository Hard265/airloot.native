import { PropsWithChildren } from "react";
import { Text as T, TextProps } from "react-native";
import { Link as RouterLink } from "@react-navigation/native";
import { RootStackParamsList } from "../Router";

const TextDefault = (props: TextProps) => {
    return (
        <T {...props} className={`font-normal text-text ${props.className}`}>
            {props.children}
        </T>
    );
};

export const Text = (props: TextProps) => {
    return <TextDefault {...props}>{props.children}</TextDefault>;
};

export const Heading = (props: TextProps) => {
    return (
        <TextDefault {...props} className={`p-4 ${props.className} text-4xl`}>
            {props.children}
        </TextDefault>
    );
};

export const Title = (props: TextProps) => {
    return (
        <TextDefault
            {...props}
            className={`text-2xl font-medium color-text ${props.className}`}
        >
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
            <TextDefault className="text-primary">{props.children}</TextDefault>
        </RouterLink>
    );
};
