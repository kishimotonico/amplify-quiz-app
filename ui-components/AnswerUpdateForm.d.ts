import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { Answer } from "./graphql/types";
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
export declare type AnswerUpdateFormInputValues = {
    createdAt?: string;
};
export declare type AnswerUpdateFormValidationValues = {
    createdAt?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type AnswerUpdateFormOverridesProps = {
    AnswerUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type AnswerUpdateFormProps = React.PropsWithChildren<{
    overrides?: AnswerUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    answer?: Answer;
    onSubmit?: (fields: AnswerUpdateFormInputValues) => AnswerUpdateFormInputValues;
    onSuccess?: (fields: AnswerUpdateFormInputValues) => void;
    onError?: (fields: AnswerUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: AnswerUpdateFormInputValues) => AnswerUpdateFormInputValues;
    onValidate?: AnswerUpdateFormValidationValues;
} & React.CSSProperties>;
export default function AnswerUpdateForm(props: AnswerUpdateFormProps): React.ReactElement;
