import React from 'react';
import './LayoutDashboard.css';
import { Grid  } from '@mui/material';
import DashboardMain from './DashboardMain/DashboardMain';
import AppBar from '../../components/AppBar/AppBar';
import DashboardSidebar from './DashboardSidebar/DashboardSidebar';
import { useQuery } from '@apollo/client';
import { READ_USER } from '../../services/user.query';

interface LayoutFormsListProps {};

function LayoutFormsList({}: LayoutFormsListProps) {

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
        <Grid container className='layout-forms-list'>
          <AppBar user={userData?.readOneUser}/>
          <DashboardSidebar/>
          <DashboardMain/>
        </Grid>
    )
}

export default LayoutFormsList;