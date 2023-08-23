import { useQuery } from "@apollo/client";
import { Typography, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { transformArrayToObject } from "../../helpers/formatDefaultValues";
import { useEditFormState } from "../../providers/formState";
import { READ_FORM } from "../../services/forms.query";
import { ReadOneFormDTO } from "../../types/form";
import { QuestionDTO } from "../../types/question";
import Questions from "./Questions/Questions";
import { themeConstants } from "../../styles/theme.constants";

export type FormState = {
  id: string,
  answer: string | {value: string},
  validation: {
    required?: boolean,
    minLength?: number,
    maxLength?: number,
  }
};

export type InitialFormState = Array<FormState>;

const mapInitialFormState = (questions: QuestionDTO[] ): InitialFormState => {
  if(questions)  {
    const res = questions.map((question: QuestionDTO) => {
      if(question.type === 'text') {
          return {
            id: question.questionId.toString(),
            answer: '',
            validation:
              {
                required: question.validation.required,
                minLength: question.validation.textCharMin,
                maxLength: question.validation.textCharMax,
              }
          };
      }
      if(question.type === 'select') {
          return {
            id: question.questionId.toString(),
            answer: {
              value: '',
            },
            validation: {}
          };
      }
      return {
        id: '',
        answer: '',
        validation: {}
      };
    });
    console.log("mapInitialFormState returns", res);
    return res;
  }
  return [{id: '', answer: '', validation: {}}];
}

const PublicFormScreen = () => {
    const {formId} = useParams();
    const {formContext, setFormContext} = useEditFormState();
    const [initialFormState, setInitialFormState] = React.useState<InitialFormState>([]);
    const {search} = useLocation();
    const queryParams = new URLSearchParams(search);
    const isPreview = Boolean(queryParams.get('preview'));

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

    if(!formContext || !formId) {
        return <Typography variant="h2">Ce questionnaire n'existe pas.</Typography>
    }

    if(formContext && formContext.visibility === false) {
        return <Typography variant="h2">Ce questionnaire n'est pas disponible.</Typography>
    }

    if(!formLoading && formContext) {
      return (
        <Grid container justifyContent='center' alignItems='center'>
          {isPreview && (
              <Grid item xs={6} sx={{backgroundColor: themeConstants.colors.semiLightGrey}} m={2}>
                  <Typography variant="h6" sx={{textAlign: 'center'}}>Formulaire en mode prévisualisation</Typography>
              </Grid>
          )}
              <Grid item xs={12}>
                <Questions initialFormState={initialFormState} defaultValues={transformArrayToObject(form?.readOneFormByFormId.questions)} />
              </Grid>
          </Grid>
      );
    }
    return <Typography>Error</Typography>;

};

export default PublicFormScreen;