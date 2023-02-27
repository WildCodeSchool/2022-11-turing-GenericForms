import React, { useEffect } from 'react';
import './DashboardMain.css';
import { useNavigate } from "react-router-dom";
import { Grid  } from '@mui/material';
import FormsListHeader from '../../FormsList/FormsListHeader/FormsListHeader';
import FormsList from '../../FormsList/FormsList';

function Dashboard() {
  const navigate = useNavigate();

  useEffect(()  => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <Grid item xs={10} className='dashboard-container'>
      <Grid container direction={'row'}>
        <FormsListHeader/>
        <FormsList />
      </Grid>
    </Grid>
  )
}

export default Dashboard