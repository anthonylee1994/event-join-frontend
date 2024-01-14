import {Field, FieldArray, FieldArrayRenderProps, useFormikContext} from "formik";
import {FormControl, FormLabel, IconButton, Input, InputGroup, VStack} from "@chakra-ui/react";
import {AddIcon, DeleteIcon} from "@chakra-ui/icons";
import {FormValues} from "./index.tsx";

export const HashTagsEdit = () => {
    const formik = useFormikContext<FormValues>();

    return (
        <FieldArray name="hashtags">
            {({push, remove}: FieldArrayRenderProps) => (
                <FormControl mb={4}>
                    <FormLabel>標籤</FormLabel>
                    <VStack spacing={4} align="flex-start">
                        {formik.values.hashtags.length > 0 ? (
                            formik.values.hashtags.map((_, index) => (
                                <Field name={`hashtags.${index}`} key={index}>
                                    {({field}) => (
                                        <InputGroup>
                                            <IconButton aria-label="Delete" icon={<DeleteIcon />} onClick={() => remove(index)} isDisabled={formik.isSubmitting} borderEndRadius={0} />
                                            <Input type="text" {...field} disabled={formik.isSubmitting} borderRadius={0} />
                                            <IconButton aria-label="Add" icon={<AddIcon />} onClick={() => push("")} isDisabled={formik.isSubmitting} borderStartRadius={0} />
                                        </InputGroup>
                                    )}
                                </Field>
                            ))
                        ) : (
                            <IconButton aria-label="Add" icon={<AddIcon />} onClick={() => push("")} isDisabled={formik.isSubmitting} />
                        )}
                    </VStack>
                </FormControl>
            )}
        </FieldArray>
    );
};
