import {FormControl, FormErrorMessage, FormLabel, Input} from "@chakra-ui/react";
import {Field, useFormikContext} from "formik";

interface Props {
    name: string;
    label: string;
}

export const TextField = ({name, label}: Props) => {
    const formik = useFormikContext();

    return (
        <Field name={name}>
            {({field, meta}) => (
                <FormControl isInvalid={Boolean(meta.touched && meta.error)} mb={4}>
                    <FormLabel>{label}</FormLabel>
                    <Input type="text" {...field} disabled={formik.isSubmitting} />
                    {meta.touched && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
                </FormControl>
            )}
        </Field>
    );
};
