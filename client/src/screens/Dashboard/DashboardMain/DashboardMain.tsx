import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid } from '@mui/material';
import FormsListHeader from '../../FormsList/FormsListHeader/FormsListHeader';
import FormsList from '../../FormsList/FormsList';
import { FormDTO } from '../../../types/form';

interface DashboardMainProps {
  forms: FormDTO[] | undefined;
  loading?: boolean;
}

function Dashboard({forms, loading}: DashboardMainProps) {
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
        <FormsList forms={forms} loading={loading} />
      </Grid>
    </Grid>
  )
}

export default Dashboard