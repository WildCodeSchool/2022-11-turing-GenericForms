import { useQuery } from "@apollo/client";
import { Typography, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { transformArrayToObject } from "../../helpers/formatDefaultValues";
import { useEditFormState } from "../../providers/formState";
import { READ_FORM } from "../../services/forms.query";
import { ReadOneFormDTO } from "../../types/form";
import { QuestionDTO } from "../../types/question";
import Questions from "./Questions/Questions";

export type FormState = {
  id: string,
  answer: string | {value: string},
};

export type InitialFormState = Array<FormState>;

interface FormScreenProps {};

const mapInitialFormState = (questions: QuestionDTO[] ): InitialFormState => {
  if(questions)  {
    const res = questions.map((question: QuestionDTO) => {
      if(question.type === 'text') {
          return {id: question.questionId.toString(), answer: ''};
      }
      if(question.type === 'select') {
          return {
            id: question.questionId.toString(),
            answer: {
              value: '',
          }};
      }
      return {id: '', answer: ''};
    });
    console.log("mapInitialFormState returns", res);
    return res;
  }
  return [{id: '', answer: ''}];
}

const FormScreen = ({}: FormScreenProps) => {
    const {formId} = useParams();
    const [formContext, setFormContext] = useEditFormState();
    const [initialFormState, setInitialFormState] = React.useState<InitialFormState>([]);

    const {data: form, loading: formLoading, error: formError, refetch: refetchQuestions} = useQuery<ReadOneFormDTO>(READ_FORM, {
        variables: { readOneFormId: formId},
        onCompleted(data: ReadOneFormDTO) {
          console.log(data);
          setInitialFormState(mapInitialFormState(data?.readOneFormByFormId?.questions));
        },
        onError(error) {
            console.log("Error while fetching form data", error);
        }
    });

    //TODO add here a hook to fetch form data, set initialFormState, set defaultValues and generate validation schema ?

    
      
    useEffect(() => {
      setFormContext(form?.readOneFormByFormId);
    }, [form]);

    formLoading && <Typography>Chargement...</Typography>;
    formError && <Typography>Erreur lors du chargement du formulaire</Typography>;

    if(formContext?.visibility == false) {
        return <Typography variant="h2">Ce questionnaire n'est pas encore publié</Typography>
    }
    if(!formLoading && formContext) {
      return (
        <Grid container justifyContent='space-around'>
              <Grid item>
                <Questions initialFormState={initialFormState} defaultValues={transformArrayToObject(form?.readOneFormByFormId.questions)} />
              </Grid>
          </Grid>
      );
    }
    return <Typography>Error</Typography>;

};

export default FormScreen;