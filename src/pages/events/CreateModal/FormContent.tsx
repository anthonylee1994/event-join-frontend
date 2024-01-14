import {Box} from "@chakra-ui/react";
import {MainButton} from "@vkruglikov/react-telegram-web-app";
import {useFormikContext} from "formik";
import {FormValues} from "./index.tsx";
import {HashTagsEdit} from "./HashTagsEdit.tsx";
import {TextAreaField} from "./TextAreaField.tsx";
import {TextField} from "./TextField.tsx";
import {TimeField} from "./TimeField.tsx";
import {JoinLinkField} from "./JoinLinkField.tsx";
import {ImageUploader} from "./ImageUploader.tsx";

export const FormContent = () => {
    const formik = useFormikContext<FormValues>();

    console.log("values", formik.values);
    console.log("errors", formik.errors);

    return (
        <Box>
            <ImageUploader name="photoUrl" label="活動圖片" />
            <TextField name="title" label="活動名稱" />
            <TextAreaField name="description" label="活動簡介" />
            <TimeField name="startTime" label="開始時間" />
            <TimeField name="endTime" label="結束時間" />
            <TextAreaField name="address" label="活動地址" />
            <TextAreaField name="quota" label="名額" />
            <TextAreaField name="fee" label="費用" />
            <HashTagsEdit />
            <JoinLinkField name="joinLink" label="參加活動連結" />

            <MainButton text="發起活動" onClick={formik.submitForm} />
        </Box>
    );
};
