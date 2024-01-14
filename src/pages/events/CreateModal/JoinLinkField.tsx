import {FormControl, FormErrorMessage, FormLabel, Input, InputGroup} from "@chakra-ui/react";
import {Field, useFormikContext} from "formik";
import {FormValues} from "./index.tsx";
import React from "react";
import {useInitData} from "@vkruglikov/react-telegram-web-app";

interface Props {
    name: string;
    label: string;
}

export const JoinLinkField = ({name, label}: Props) => {
    const formik = useFormikContext<FormValues>();
    const [initDataUnsafe] = useInitData();

    React.useEffect(() => {
        formik.setFieldValue(name, `https://t.me/${initDataUnsafe?.user?.username}`);
    }, []);

    return (
        <Field name={name}>
            {({field, meta}) => (
                <FormControl isInvalid={Boolean(meta.touched && meta.error)} mb={4}>
                    <FormLabel>{label}</FormLabel>
                    <InputGroup>
                        <Input flexGrow={1} type="text" {...field} disabled={formik.isSubmitting} borderStartRadius={0} />
                    </InputGroup>
                    {meta.touched && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
                </FormControl>
            )}
        </Field>
    );
};
