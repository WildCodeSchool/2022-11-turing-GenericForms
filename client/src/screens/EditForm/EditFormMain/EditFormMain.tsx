import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid, Typography  } from '@mui/material';
import { ReadOneQuestionDTO } from '../../../types/question';
import { QuestionType } from '../../../types/questionEnum';
import { useQuery } from '@apollo/client';
import { READ_QUESTION } from '../../../services/question.query';

interface EditFormMainProps {
  formId?: string;
  questionId: number | null;
}

function EditFormMain({formId, questionId}: EditFormMainProps) {
  const navigate = useNavigate();

  useEffect(()  => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);
  
  const {data, loading: questionLoading, error: questionError} = useQuery<ReadOneQuestionDTO>(READ_QUESTION, {
    variables: { questionId},
    onCompleted(data: ReadOneQuestionDTO) {
      console.log(data);
    },
    onError(error: any) {
        console.log(error);
    }
  });

  // //TODO Display main view component based on their type and details
  const previewQuestion = (type: QuestionType) => {
    switch (type) {
      case QuestionType.SHORTTEXT:
        return <div>Text question</div>
      case QuestionType.LONGTEXT:
        return <div>Long text question</div>
      case QuestionType.NUMBER:
        return <div>Number question</div>
      case QuestionType.DATE:
        return <div>Date question</div>
      case QuestionType.CHECKBOX:
        return <div>Checkbox question</div>
      case QuestionType.RADIO:
        return <div>Radio question</div>
      case QuestionType.DROPDOWN:
        return <div>Dropdown question</div>
      default:
        return <div>Unknown question type</div>
    }
  };
      
  
  return (
    <Grid item xs={10}>
      {data?.readQuestionById.type && previewQuestion(data?.readQuestionById.type)}
      <Grid container direction={'column'}>
        <Typography variant="h4">
            Edit question #{questionId} in Form #{formId}
        </Typography>
        <Typography variant="h6">
            Question : {data?.readQuestionById.title}
        </Typography>
        <Typography variant="h6">
            Description : {data?.readQuestionById.description}
        </Typography>
        <Typography variant="h6">
            Type : {data?.readQuestionById.type}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default EditFormMain