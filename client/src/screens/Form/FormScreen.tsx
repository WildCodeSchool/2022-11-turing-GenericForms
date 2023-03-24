import { useQuery } from "@apollo/client";
import { formGroupClasses, List, ListItem, ListItemText, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useEditFormState } from "../../providers/formState";
import { READ_FORM } from "../../services/forms.query";
import { FormDTO, ReadOneFormDTO } from "../../types/form";
import { QuestionDTO } from "../../types/question";
import QuestionList from "./QuestionList";

interface FormScreenProps {};

const FormScreen = ({}: FormScreenProps) => {
    const {formId} = useParams();
    const [formContext, setFormContext] = useEditFormState();

    const {data: form, loading: formLoading, error: formError, refetch: refetchQuestions} = useQuery<ReadOneFormDTO>(READ_FORM, {
        variables: { readOneFormId: formId},
        onCompleted(data: ReadOneFormDTO) {
          console.log(data);
        },
        onError(error) {
            console.log(error);
        }
      });
      
      useEffect(() => {
        setFormContext(form?.readOneFormByFormId);
      }, [form]);

    formLoading && <Typography>Loading...</Typography>;
    formError && <Typography>Error</Typography>;

    if(formContext?.visibility === false) {
        return <Typography variant="h2">Ce questionnaire n'est pas encore publié</Typography>
    }

    return (
        <>
            <Typography variant="h2">{formContext?.title}</Typography>
            <QuestionList questions={formContext?.questions} />
        </>
    );
};

export default FormScreen;