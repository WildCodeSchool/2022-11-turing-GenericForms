import React from 'react';
import { Grid  } from '@mui/material';
import AppBar from '../../components/AppBar/AppBar';
import { useQuery } from '@apollo/client';
import { READ_USER } from '../../services/user.query';
import EditFormMain from './EditFormMain/EditFormMain';
import EditFormSidebar from './EditFormSidebar/EditFormSidebar';
import { useParams } from 'react-router-dom';
import { READ_FORM } from '../../services/forms.query';
import { ReadOneFormDTO } from '../../types/form';

interface EditFormScreenProps {};

function EditFormScreen({}: EditFormScreenProps) {
  const {formId} = useParams();

  // TODO get user id from backend token return ? 
  const {data: userData, loading, error} = useQuery<ReadOneUserDTO>(READ_USER, {
    variables: { readOneUserId: "1"},
    onCompleted(data: ReadOneUserDTO) {
      console.log(data);
    },
    onError(error) {
        console.log(error);
    }
  });

  const {data: form, loading: formLoading, error: formError} = useQuery<ReadOneFormDTO>(READ_FORM, {
    variables: { readOneFormId: formId},
    onCompleted(data: ReadOneFormDTO) {
      console.log(data);
    },
    onError(error) {
        console.log(error);
    }
  });
  const [questionId, setQuestionId] = React.useState<number | undefined>(form?.readOneForm.questions[0].questionId);

  //TODO save questions when save button (from Appbar) is clicked => useMutation
  //? to handle save : store questions in a state and update when button clicked ?

    if (!formId) {
      return <div>Erreur : Pas de formulaire à afficher...</div>
    }

    return (
        <Grid container sx={{minHeight: '100vh'}} alignContent={'flex-start'}>
          <AppBar user={userData?.readOneUser} editForm={true}/>
          <EditFormSidebar formId={formId} questions={form?.readOneForm.questions} setQuestionId={setQuestionId}/>
          <EditFormMain formId={formId} questionId={questionId} />
        </Grid>
    )
}

export default EditFormScreen;