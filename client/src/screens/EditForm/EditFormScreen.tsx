import React, { useEffect } from 'react';
import { Grid  } from '@mui/material';
import AppBar from '../../components/AppBar/AppBar';
import { useMutation, useQuery } from '@apollo/client';
import EditFormMain from './EditFormMain/EditFormMain';
import EditFormSidebarLeft from './EditFormSidebarLeft/EditFormSidebarLeft';
import { useParams } from 'react-router-dom';
import { READ_FORM } from '../../services/forms.query';
import { CREATE_QUESTION, UPDATE_QUESTION } from '../../services/question.mutation';
import { ReadOneFormDTO } from '../../types/form';
import { CreateQuestionInput, CreateQuestionResponse, QuestionDTO, UpdateQuestionInput } from '../../types/question';
import { useEditFormState } from '../../providers/formState';
import { ResponseMessageDTO } from '../../types/commonComponents';
import { UPDATE_CHOICE } from '../../services/choice.mutation';
import { UpdateChoiceInput } from '../../types/choice';
import { useUserState } from '../../providers/userState';
import { UPDATE_FORM } from '../../services/forms.mutation';

interface EditFormScreenProps {};

function EditFormScreen({}: EditFormScreenProps) {
  const {formId} = useParams();
  const [formContext, setFormContext] = useEditFormState();
  const [userContext, setUserContext] = useUserState();

  const {data: form, loading: formLoading, error: formError, refetch: refetchQuestions} = useQuery<ReadOneFormDTO>(READ_FORM, {
    variables: { readOneFormId: formId},
    onError(error) {
        console.log(error);
    }
  });
  const [questionIndex, setQuestionIndex] = React.useState<number | undefined>();

  const [updateQuestion, { data: updateQuestionResponse, loading: loadingQuestionUpdate, error: errorQuestionUpdate }] = useMutation(UPDATE_QUESTION, {
    onCompleted(data: ResponseMessageDTO) {
        console.log("updateQuestion completed");
    },
    onError(error: any) {
        console.log(error);
    }
  });

  const [createQuestion, { data: createQuestionResponse, loading: loadingQuestionCreate, error: errorQuestionCreate }] = useMutation(CREATE_QUESTION, {
    onCompleted(data: CreateQuestionResponse) {
      console.log("createQuestion completed");
    },
    onError(error: any) {
      console.log(error);
    }
   });

  const [updateChoice, { data: updateChoiceResponse, loading: loadingChoiceUpdate, error: errorChoiceUpdate }] = useMutation(UPDATE_CHOICE, {
    onCompleted(data: ResponseMessageDTO) {
      console.log("updateQuestion completed");
    },
    onError(error: any) {
      console.log(error);
    }
  });

  const [updateForm, { data: updateFormResponse, loading: loadingFormUpdate, error: errorFormUpdate }] = useMutation(UPDATE_FORM, {
    variables: { updateFormInput: {
      formId: formContext?.formId,
      title: formContext?.title,
      description: formContext?.description,
      category: formContext?.category,
      themeId: formContext?.theme.themeId,
      visibility: formContext?.visibility,
    }},
    onCompleted(data: ResponseMessageDTO) {
      console.log("updateForm completed");
    },
    onError(error: any) {
      console.log(error);
    }
  });
  

  useEffect(() => {
    setFormContext(form?.readOneFormByFormId);
  }, [form]);

  //? Is forEach the best solution ? What if one server call fails ? 
  //? Should we use concept like a Promise.all() instead ?
  const handleSave = () => {
    console.log("save");

    //TODO create a mutation to update the form title, category, description, themeId...

    updateForm();

    formContext.questions.forEach((question: QuestionDTO) => {
      if(question.questionId === undefined) {
        const createQuestionInput: CreateQuestionInput = {
          title: question.title,
          description: question.description,
          type: question.type,
          formId: question.formId,
        };
        createQuestion({variables: {createQuestionInput}});
        return;
      };
      const updateQuestionInput: UpdateQuestionInput = {
        questionId: question.questionId,
        title: question.title,
        description: question.description,
        type: question.type,
        formId: question.formId,
        validationId: question.validation.validationId,
      };
      updateQuestion({variables: {updateQuestionInput}});

      //TODO transfer in back the below logic on Choices array to save choices if question.choices.length > 0
      if(question.choices.length > 0) {
        question.choices.forEach((choice) => {
          const updateChoiceInput: UpdateChoiceInput = {
            choiceId: choice.choiceId,
            text: choice.text,
          };
          updateChoice({variables: {updateChoiceInput}});
        });
      }

      //will send back a ResponseMessageDTO => should use to display a message to the user 
      console.log("update question response: ", updateQuestionResponse);
    });
    refetchQuestions();
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