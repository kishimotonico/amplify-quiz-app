import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
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
export declare type OptionCreateFormInputValues = {
    label?: string;
    content?: string;
};
export declare type OptionCreateFormValidationValues = {
    label?: ValidationFunction<string>;
    content?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type OptionCreateFormOverridesProps = {
    OptionCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    label?: PrimitiveOverrideProps<TextFieldProps>;
    content?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type OptionCreateFormProps = React.PropsWithChildren<{
    overrides?: OptionCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: OptionCreateFormInputValues) => OptionCreateFormInputValues;
    onSuccess?: (fields: OptionCreateFormInputValues) => void;
    onError?: (fields: OptionCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: OptionCreateFormInputValues) => OptionCreateFormInputValues;
    onValidate?: OptionCreateFormValidationValues;
} & React.CSSProperties>;
export default function OptionCreateForm(props: OptionCreateFormProps): React.ReactElement;
