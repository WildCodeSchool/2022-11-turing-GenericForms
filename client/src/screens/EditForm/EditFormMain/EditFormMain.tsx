import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid, Typography  } from '@mui/material';
import { QuestionDTO, ReadOneQuestionDTO } from '../../../types/question';
import { QuestionType } from '../../../types/questionEnum';
import TextQuestionPreview from '../../../components/QuestionPreview/TextQuestionPreview';
import SelectQuestionPreview from '../../../components/QuestionPreview/SelectQuestionPreview';
import NumberQuestionPreview from '../../../components/QuestionPreview/NumberQuestionPreview';
import NoQuestionPreview from '../../../components/QuestionPreview/NoQuestionPreview';

interface EditFormMainProps {
  questionId: number | undefined;
  questions: QuestionDTO[] | undefined; //? proviennent du FormContext
  setFormContext: any;
}

const questionPreview = (question: QuestionDTO, setFormContext: any) => {
  switch (question.type) {
    case QuestionType.TEXT:
      return <TextQuestionPreview question={question} setFormContext={setFormContext} />;
    case QuestionType.NUMBER:
      return <NumberQuestionPreview />;
    case QuestionType.SELECT:
      return <SelectQuestionPreview question={question} setFormContext={setFormContext} />;
    default:
      return <NoQuestionPreview />;
  };
};

function EditFormMain({questionId, questions, setFormContext}: EditFormMainProps) {
  const navigate = useNavigate();

  useEffect(()  => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  let question = {} as QuestionDTO | undefined;
  if(questions && questionId) {
    question = questions.find((question) => question.questionId === questionId);
  }

  if(question && questionId) {
    return (
      <Grid item xs={10}>
            {questionPreview(question, setFormContext)}
      </Grid>
    )
  }

  return (
    <Grid item xs={10}>
      <Grid container direction={'column'}>
        <Typography variant="h4">
          No question selected
        </Typography>
      </Grid>
    </Grid>
  )
  
  
}

export default EditFormMain;