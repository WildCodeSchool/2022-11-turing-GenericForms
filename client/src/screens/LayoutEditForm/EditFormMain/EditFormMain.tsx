import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid, Typography  } from '@mui/material';

interface EditFormMainProps {
  formId?: string;
}

function EditFormMain({formId}: EditFormMainProps) {
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
        <Typography variant="h4">
            Edit Form #{formId}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default EditFormMain