import React, { useEffect } from 'react';
import { Grid  } from '@mui/material';
import AppBar from '../../components/AppBar/AppBar';
import { useMutation, useQuery } from '@apollo/client';
import { READ_USER } from '../../services/user.query';
import EditFormMain from './EditFormMain/EditFormMain';
import EditFormSidebar from './EditFormSidebar/EditFormSidebar';
import { useParams } from 'react-router-dom';
import { READ_FORM } from '../../services/forms.query';
import { CREATE_QUESTION, UPDATE_QUESTION } from '../../services/question.mutation';
import { FormDTO, ReadOneFormDTO } from '../../types/form';
import { CreateQuestionInput, CreateQuestionResponse, QuestionDTO } from '../../types/question';
import { useEditFormState } from '../../providers/formState';
import { ResponseMessageDTO } from '../../types/commonComponents';

interface EditFormScreenProps {};

function EditFormScreen({}: EditFormScreenProps) {
  const {formId} = useParams();
  const [formContext, setFormContext] = useEditFormState();

  const {data: userData, loading, error} = useQuery<ReadOneUserDTO>(READ_USER, {
    variables: { readOneUserId: "1"},
    onCompleted(data: ReadOneUserDTO) {
      console.log(data);
    },
    onError(error) {
        console.log(error);
    }
  });

  const {data: form, loading: formLoading, error: formError, refetch: refetchQuestions} = useQuery<ReadOneFormDTO>(READ_FORM, {
    variables: { readOneFormId: formId},
    onCompleted(data: ReadOneFormDTO) {
      console.log(data);
    },
    onError(error) {
        console.log(error);
    }
  });
  const [questionIndex, setQuestionIndex] = React.useState<number | undefined>();

  const [updateQuestion, { data: updateQuestionResponse, loading: loadingQuestionUpdate, error: errorQuestionUpdate }] = useMutation(UPDATE_QUESTION, {
    onCompleted(data: ResponseMessageDTO) {
      console.log(data);
    },
    onError(error: any) {
        console.log(error);
    }
  });

  const [createQuestion, { data: createQuestionResponse, loading: loadingQuestionCreate, error: errorQuestionCreate }] = useMutation(CREATE_QUESTION, {
    onCompleted(data: CreateQuestionResponse) {
      console.log(data);
    },
    onError(error: any) {
      console.log(error);
    }
   });


  useEffect(() => {
    setFormContext(form?.readOneForm);
  }, [form]);

  //? Is forEach the best solution ? What if one server call fails ? 
  //? Should we use concept like a Promise.all() instead ?
  const handleSave = () => {
    console.log("save");
    formContext.questions.forEach((question: QuestionDTO) => {
      if(question.questionId === undefined) {
        const createQuestionInput: CreateQuestionInput = {
          title: question.title,
          description: question.description,
          type: question.type,
          formId: question.formId,
        };
        return createQuestion({variables: {createQuestionInput}});
      };
      const updateQuestionInput = {
        questionId: question.questionId,
        title: question.title,
        description: question.description,
        type: question.type,
        formId: question.formId,
      };
      updateQuestion({variables: {updateQuestionInput}});

      //TODO add another call on Choices array to save choices if question.choices.length > 0
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
        <Grid container sx={{minHeight: '100vh'}} alignContent={'flex-start'}>
          <AppBar user={userData?.readOneUser} editForm={true} handleSave={handleSave} />
          <EditFormSidebar questions={formContext?.questions} setQuestionIndex={setQuestionIndex} setFormContext={setFormContext} />
          <EditFormMain questions={formContext?.questions} questionIndex={questionIndex} setFormContext={setFormContext} />
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