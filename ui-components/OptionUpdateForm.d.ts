import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Option } from "./graphql/types";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type OptionUpdateFormInputValues = {
    label?: string;
    content?: string;
};
export declare type OptionUpdateFormValidationValues = {
    label?: ValidationFunction<string>;
    content?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OptionUpdateFormOverridesProps = {
    OptionUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    label?: PrimitiveOverrideProps<TextFieldProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OptionUpdateFormProps = React.PropsWithChildren<{
    overrides?: OptionUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    option?: Option;
    onSubmit?: (fields: OptionUpdateFormInputValues) => OptionUpdateFormInputValues;
    onSuccess?: (fields: OptionUpdateFormInputValues) => void;
    onError?: (fields: OptionUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OptionUpdateFormInputValues) => OptionUpdateFormInputValues;
    onValidate?: OptionUpdateFormValidationValues;
} & React.CSSProperties>;
export default function OptionUpdateForm(props: OptionUpdateFormProps): React.ReactElement;
