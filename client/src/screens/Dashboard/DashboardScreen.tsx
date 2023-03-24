import React from 'react';
import { Grid, Typography  } from '@mui/material';
import DashboardMain from './DashboardMain/DashboardMain';
import AppBar from '../../components/AppBar/AppBar';
import DashboardSidebar from './DashboardSidebar/DashboardSidebar';
import { useQuery } from '@apollo/client';
import { READ_USER } from '../../services/user.query';
import { useUserState } from '../../providers/userState';

interface DashboardScreenProps {};

function DashboardScreen({}: DashboardScreenProps) {
  const userId = localStorage.getItem("userId");
  const [userContext, setUserContext] = useUserState();

  const {data: userData, loading, error} = useQuery<ReadOneUserDTO>(READ_USER, {
    variables: { readOneUserId: userId},
    onCompleted(data: ReadOneUserDTO) {
      console.log("get user data completed");
      setUserContext(data.readOneUser);
    },
    onError(error) {
        console.log(error);
    }
  });

  loading && <Typography>Loading...</Typography>;
  error && <Typography>Error</Typography>;
  
    return (
        <Grid container sx={{minHeight: '100vh'}} alignContent={'flex-start'}>
          <AppBar user={userData?.readOneUser}/>
          <DashboardSidebar/>
          <DashboardMain forms={userData?.readOneUser.forms} />
        </Grid>
    )
}

export default DashboardScreen;