import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid, Typography  } from '@mui/material';
import FormsListHeader from '../../FormsList/FormsListHeader/FormsListHeader';
import FormsList from '../../FormsList/FormsList';
import { FormDTO } from '../../../types/form';

interface DashboardMainProps {
  forms: FormDTO[] | undefined;
};

function Dashboard({forms}: DashboardMainProps) {
  const navigate = useNavigate();

  useEffect(()  => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <Grid item xs={10}>
      <Grid container direction={'row'}>
        <FormsListHeader/>
        <FormsList forms={forms} />
      </Grid>
    </Grid>
  )
}

export default Dashboard