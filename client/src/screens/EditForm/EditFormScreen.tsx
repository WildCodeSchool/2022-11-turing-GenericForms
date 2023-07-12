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
import { CreateQuestionInput, DeleteQuestionResponse, QuestionDTO, UpdateQuestionInput } from '../../types/question';
import { useEditFormState } from '../../providers/formState';
import { UPDATE_CHOICE } from '../../services/choice.mutation';
import { UpdateChoiceInput } from '../../types/choice';
import { useUserState } from '../../providers/userState';
import { UPDATE_FORM } from '../../services/forms.mutation';
import { UPDATE_VALIDATION } from '../../services/validation.mutation';
import { ValidationDTO } from '../../types/validation';

function EditFormScreen() {
  const {formId} = useParams();
  const {formContext, setFormContext} = useEditFormState();
  const [userContext, setUserContext] = useUserState();

  const {data: form, loading: formLoading, refetch: refetchQuestions} = useQuery<ReadOneFormDTO>(READ_FORM, {
    variables: { readOneFormId: formId},
    onError(error) {
        console.log(error);
    }
  });
  const [questionIndex, setQuestionIndex] = React.useState<number | undefined>();

  const [updateQuestion, { data: updateQuestionResponse }] = useMutation(UPDATE_QUESTION, {
    onCompleted() {
        console.log("updateQuestion completed");
    },
    onError(error) {
        console.log(error);
    }
  });

  const [createQuestion] = useMutation(CREATE_QUESTION, {
    onCompleted() {
      console.log("createQuestion completed");
    },
    onError(error) {
      console.log(error);
    }
   });

  const [updateChoice] = useMutation(UPDATE_CHOICE, {
    onCompleted() {
      console.log("updateQuestion completed");
    },
    onError(error) {
      console.log(error);
    }
  });

  const [updateValidation] = useMutation(UPDATE_VALIDATION, {
    onCompleted(data: ValidationDTO) {
      console.log("updateValidation completed => ", data);
    },
    onError(error) {
      console.log(error);
    }
  });

  const [updateForm] = useMutation(UPDATE_FORM, {
    variables: { updateFormInput: {
      formId: formContext?.formId,
      title: formContext?.title,
      category: formContext?.category,
      themeId: formContext?.theme.themeId,
      visibility: formContext?.visibility,
    }},
    onCompleted() {
      console.log("updateForm completed");
    },
    onError(error) {
      console.log(error);
    }
  });

  const [deleteQuestion] = useMutation(DELETE_QUESTION, {
    onCompleted(data: DeleteQuestionResponse) {
      console.log("deleteQuestion completed", data);
    },
    onError(error) {
      console.log(error);
    }
  });

  useEffect(() => {
    setFormContext(form?.readOneFormByFormId);
  }, [form]);

  //? Is forEach the best solution ? What if one server call fails ? 
  //? Should we use concept like a Promise.all() instead ?
  const handleSave = () => {
    // first update the form data
    updateForm().catch((error) => {
      console.log(error);
    });

    // then update each questions data using a loop
    formContext?.questions.forEach((question: QuestionDTO) => {
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

      //will send back a ResponseMessageDTO => should use to display a message to the user 
      console.log("update question response: ", updateQuestionResponse);
    });
    refetchQuestions().catch((error) => {
      console.log("refetchQuestions error: ", error);
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
            <EditFormMain questions={formContext?.questions} questionIndex={questionIndex} setFormContext={setFormContext} />
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