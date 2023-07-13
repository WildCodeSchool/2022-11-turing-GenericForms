import React, { useEffect } from 'react';
import { Grid  } from '@mui/material';
import AppBar from '../../components/AppBar/AppBar';
import { useMutation, useQuery } from '@apollo/client';
import EditFormMain from './EditFormMain/EditFormMain';
import EditFormSidebarLeft from './EditFormSidebarLeft/EditFormSidebarLeft';
import { useParams } from 'react-router-dom';
import { READ_FORM } from '../../services/forms.query';
import { CREATE_QUESTION, DELETE_QUESTION, UPDATE_QUESTION } from '../../services/question.mutation';
import { ReadOneFormDTO } from '../../types/form';
import { CreateQuestionInput, QuestionDTO, UpdateQuestionInput } from '../../types/question';
import { useEditFormState } from '../../providers/formState';
import { UPDATE_CHOICE } from '../../services/choice.mutation';
import { UpdateChoiceInput } from '../../types/choice';
import { useUserState } from '../../providers/userState';
import { UPDATE_FORM } from '../../services/forms.mutation';
import { UPDATE_VALIDATION } from '../../services/validation.mutation';
import { toastError, toastSuccess } from '../../helpers/toasts';

function EditFormScreen() {
  const {formId} = useParams();
  const {formContext, setFormContext} = useEditFormState();
  const {userContext} = useUserState();

  const {data: form, loading: formLoading, refetch: refetchForm} = useQuery<ReadOneFormDTO>(READ_FORM, {
    variables: { readOneFormId: formId},
    onError(error) {
        console.log(error);
        toastError("Erreur lors du chargement du formulaire !");
    }
  });

  const [questionIndex, setQuestionIndex] = React.useState<number | undefined>();

  const [updateQuestion, {error: updateQuestionError }] = useMutation(UPDATE_QUESTION);

  const [createQuestion, {error: createQuestionError}] = useMutation(CREATE_QUESTION);

  const [updateChoice, {error: updateChoiceError}] = useMutation(UPDATE_CHOICE);

  const [updateValidation, {error: updateValidationError}] = useMutation(UPDATE_VALIDATION);

  const [updateForm, {error: updateFormError}] = useMutation(UPDATE_FORM, {
    variables: { updateFormInput: {
      formId: formContext?.formId,
      title: formContext?.title,
      category: formContext?.category,
      themeId: formContext?.theme.themeId,
      visibility: formContext?.visibility,
    }}
  });

  const [deleteQuestion, {error: deleteQuestionError}] = useMutation(DELETE_QUESTION);

  useEffect(() => {
    setFormContext(form?.readOneFormByFormId);
  }, [form]);

  const handleSave = () => {   
    const questionsMutation = formContext?.questions.forEach((question: QuestionDTO) => {
      if(question.deleted) {
        deleteQuestion({variables: {questionId: question.questionId}}).catch((error) => {
          console.log(error);
        });
        return;
      }
      if(question.questionId === undefined) {
        const createQuestionInput: CreateQuestionInput = {
          title: question.title,
          description: question.description,
          type: question.type,
          formId: question.formId,
        };
        createQuestion({variables: {createQuestionInput}}).catch((error) => {
          console.log("create question error: ", error);
        });
        return;
      }
      //TODO add validation properties on UpdateQuestionInput in backend mutation (textCharMin, textCharMax, required...)
      // and pass these properties to the updateQuestionInput so backend can create a new validation entry
      const updateQuestionInput: UpdateQuestionInput = {
        questionId: question.questionId,
        title: question.title,
        description: question.description,
        type: question.type,
        formId: question.formId,
        validationId: question.validation.validationId,
      };
      updateQuestion({variables: {updateQuestionInput}}).catch((error) => {
        console.log("update question error: ", error);
      });

      if(question.validation.validationId !== undefined) {
          const updateValidationInput = {
            validationId: question.validation.validationId,
            required: question.validation.required,
            textCharMin: question.validation.textCharMin,
            textCharMax: question.validation.textCharMax,
          };
          updateValidation({variables: {updateValidationInput}}).catch((error) => {
            console.log("update validation error: ", error);
          });
        }

      //TODO transfer in back the below logic on Choices array to save choices if question.choices.length > 0
      if(question.choices.length > 0) {
        question.choices.forEach((choice) => {
          const updateChoiceInput: UpdateChoiceInput = {
            choiceId: choice.choiceId,
            text: choice.text,
          };
          updateChoice({variables: {updateChoiceInput}}).catch((error) => {
            console.log("update choice error: ", error);
          });
        });
      }
    });

    Promise.all([
        updateForm(),
        questionsMutation,
    ]).then((result) => {
      if (
          updateQuestionError ||
          createQuestionError ||
          updateChoiceError ||
          updateValidationError ||
          updateFormError ||
          deleteQuestionError
        ) {
          throw new Error("Error in one of the mutation");
        }
      console.log("Promise.all result: ", result);
      refetchForm().catch((error) => {
        console.log("refetchQuestions error: ", error);
      });
      toastSuccess("Formulaire sauvegardé !");
    }).catch((error) => {
      console.log("Promise.all error: ", error);
      toastError("Erreur lors de la sauvegarde du formulaire !");
    });

  };

    if (!formId) {
      return <div>Erreur : Pas de formulaire à afficher...</div>
    }

    if(formLoading) return <div>Loading...</div>;

    return (
        <Grid container sx={{minHeight: '50vh', flexGrow: 1}} alignContent={'flex-start'}>
          <AppBar user={userContext} form={formContext} editForm={true} handleSave={handleSave} />
          <Grid container direction={'row'}>
            <EditFormSidebarLeft questions={formContext?.questions} setQuestionIndex={setQuestionIndex} />
            <EditFormMain questions={formContext?.questions} questionIndex={questionIndex} />
          </Grid>
        </Grid>
    )
}

export default EditFormScreen;


  //? to refetch can use the Query name ? 
  //? Example : refetches two queries after mutation completes
  // const [addTodo, { data, loading, error }] = useMutation(ADD_TODO, {
  //   refetchQueries: [
  //     {query: GET_POST}, // DocumentNode object parsed with gql
  //     'GetComments' // Query name
  //   ],
  // });