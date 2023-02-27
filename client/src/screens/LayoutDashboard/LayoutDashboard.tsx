import React from 'react';
import './LayoutDashboard.css';
import { Grid  } from '@mui/material';
import DashboardMain from './DashboardMain/DashboardMain';
import AppBar from '../../components/AppBar/AppBar';
import DashboardSidebar from './DashboardSidebar/DashboardSidebar';

interface LayoutFormsListProps {};

function LayoutFormsList({}: LayoutFormsListProps) {
    return (
        <Grid container className='layout-forms-list'>
          <AppBar/>
          <DashboardSidebar/>
          <DashboardMain/>
        </Grid>
    )
}

export default LayoutFormsList;