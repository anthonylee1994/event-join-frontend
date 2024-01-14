import {Modal, ModalBody, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/react";
import {useCreateEventStore} from "../../../stores/useCreateEventStore.ts";
import {BackButton} from "@vkruglikov/react-telegram-web-app";
import {Form, Formik} from "formik";
import * as Yup from "yup";
import {FormContent} from "./FormContent.tsx";
import moment from "moment";
import {apiClient} from "../../../util/apiClient.ts";
import {useNavigate} from "react-router-dom";

export interface FormValues {
    title: string;
    photoUrl: string;
    description: string;
    startTime: string;
    endTime: string;
    address: string;
    quota: string;
    fee: string;
    hashtags: string[];
    joinLink: string;
}

const CreateSchema = Yup.object().shape({
    title: Yup.string().trim().required("必須填寫"),
    photoUrl: Yup.string().trim(),
    description: Yup.string().trim().required("必須填寫"),
    startTime: Yup.string().trim().required("必須填寫"),
    endTime: Yup.string().trim(),
    address: Yup.string().trim(),
    quota: Yup.string().trim(),
    fee: Yup.string().trim(),
    hashtags: Yup.array().of(Yup.string().trim()),
    joinLink: Yup.string().trim().required("必須填寫"),
});

export const CreateModal = () => {
    const open = useCreateEventStore(state => state.open);
    const setModalOpen = useCreateEventStore(state => state.setModalOpen);

    const onClose = () => setModalOpen(false);

    const navigate = useNavigate();

    return (
        <Modal size="full" isOpen={open} onClose={onClose}>
            <Formik<FormValues>
                validationSchema={CreateSchema}
                initialValues={{
                    photoUrl: "",
                    title: "",
                    description: "",
                    startTime: moment().add(1, "week").format("YYYY-MM-DDTHH:mm"),
                    endTime: moment().add(2, "week").format("YYYY-MM-DDTHH:mm"),
                    address: "",
                    quota: "",
                    fee: "",
                    hashtags: [],
                    joinLink: "",
                }}
                onSubmit={async (values, formikHelpers) => {
                    formikHelpers.setSubmitting(true);
                    const formValues = {};

                    if (values.photoUrl) formValues["photo_url"] = values.photoUrl;
                    formValues["title"] = values.title;
                    formValues["description"] = values.description;
                    formValues["start_time"] = values.startTime;
                    if (values.endTime) formValues["end_time"] = values.endTime;
                    if (values.address) formValues["address"] = values.address;
                    if (values.quota) formValues["quota"] = values.quota;
                    if (values.fee) formValues["fee"] = values.fee;
                    if (values.hashtags) formValues["hashtags"] = values.hashtags.filter(Boolean);
                    formValues["join_link"] = values.joinLink;

                    const response = await apiClient.post("/events", formValues);
                    formikHelpers.setSubmitting(false);
                    navigate(`/details/${response.data.id}`);
                }}
            >
                <Form>
                    <BackButton onClick={onClose} />
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>發起新活動</ModalHeader>
                        <ModalBody>
                            <FormContent />
                        </ModalBody>
                    </ModalContent>
                </Form>
            </Formik>
        </Modal>
    );
};
