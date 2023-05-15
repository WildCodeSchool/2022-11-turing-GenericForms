import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid, Typography  } from '@mui/material';
import { QuestionDTO } from '../../../types/question';
import { QuestionType } from '../../../types/questionEnum';
import TextQuestionPreview from '../../../components/QuestionPreview/TextQuestionPreview';
import SelectQuestionPreview from '../../../components/QuestionPreview/SelectQuestionPreview';
import NumberQuestionPreview from '../../../components/QuestionPreview/NumberQuestionPreview';
import NoQuestionPreview from '../../../components/QuestionPreview/NoQuestionPreview';
import EditFormSidebarRight from '../EditFormSidebarRight/EditFormSidebarRight';

interface EditFormMainProps {
  questionIndex: number | undefined;
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

function EditFormMain({questionIndex, questions, setFormContext}: EditFormMainProps) {
  const navigate = useNavigate();

  useEffect(()  => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  let question = {} as QuestionDTO | undefined;
  if(questions && typeof questionIndex !== 'undefined') {
    question = questions[questionIndex];
  }
  //TODO change left drawer for a simple sidebar component : better layout management

  if(question) {
    return (
      <>
      <Grid item xs={7}>
            {questionPreview(question, setFormContext)}
      </Grid>
      <Grid item xs={3} sx={{backgroundColor: 'white', border: '1px solid black'}}>
        <EditFormSidebarRight question={question} setFormContext={setFormContext} />
      </Grid>
      </>
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