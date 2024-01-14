import {AspectRatio, Box, FormControl, FormLabel, Image} from "@chakra-ui/react";
import {Field, FieldProps} from "formik";
import {AddIcon} from "@chakra-ui/icons";
import {apiClient} from "../../../util/apiClient.ts";

interface Props {
    name: string;
    label: string;
}

export const ImageUploader = ({name, label}: Props) => {
    return (
        <Field name={name}>
            {({field, meta, form}: FieldProps) => (
                <FormControl isInvalid={Boolean(meta.touched && meta.error)} mb={4}>
                    <FormLabel>{label}</FormLabel>
                    <label htmlFor="photoUrl">
                        <AspectRatio bgColor="gray.300" ratio={16 / 9} mb={4} cursor="pointer">
                            {field.value ? (
                                <Image src={field.value} />
                            ) : (
                                <Box>
                                    <AddIcon fontSize="3xl" color="gray.500" />
                                </Box>
                            )}
                        </AspectRatio>
                    </label>
                    <input
                        onChange={async e => {
                            if (!e.target.files) return;

                            const formData = new FormData();
                            formData.append("image", e.target.files[0]);
                            const response = await apiClient.post("/photos", formData, {
                                headers: {
                                    "Content-Type": "multipart/form-data",
                                },
                            });
                            form.setFieldValue("photoUrl", response.data.url);
                            e.target.value = "";
                        }}
                        id="photoUrl"
                        type="file"
                        name={name}
                        hidden
                        accept="image/*"
                    />
                </FormControl>
            )}
        </Field>
    );
};
