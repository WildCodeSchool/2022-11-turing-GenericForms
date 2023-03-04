import React from 'react';
import { Grid  } from '@mui/material';
import AppBar from '../../components/AppBar/AppBar';
import { useQuery } from '@apollo/client';
import { READ_USER } from '../../services/user.query';
import EditFormMain from './EditFormMain/EditFormMain';
import EditFormSidebar from './EditFormSidebar/EditFormSidebar';
import { useParams } from 'react-router-dom';

interface LayoutEditFormProps {};

function LayoutEditForm({}: LayoutEditFormProps) {

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
  
    return (
        <Grid container sx={{minHeight: '100vh'}} alignContent={'flex-start'}>
          <AppBar user={userData?.readOneUser}/>
          <EditFormSidebar/>
          <EditFormMain formId={formId} />
        </Grid>
    )
}

export default LayoutEditForm;