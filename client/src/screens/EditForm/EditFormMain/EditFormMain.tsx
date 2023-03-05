import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid, Typography  } from '@mui/material';

interface EditFormMainProps {
  formId?: string;
  questionId: number | null;
}

function EditFormMain({formId, questionId}: EditFormMainProps) {
  const navigate = useNavigate();

  //TODO make query tio get question data and display based on their type and details

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
            Edit question #{questionId} in Form #{formId}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default EditFormMain