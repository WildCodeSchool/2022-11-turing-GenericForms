import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Grid, Typography  } from '@mui/material';
import { QuestionDTO } from '../../../types/question';
import { QuestionType } from '../../../types/questionEnum';
import TextQuestionPreview from '../../../components/QuestionPreview/TextQuestionPreview';
import SelectQuestionPreview from '../../../components/QuestionPreview/SelectQuestionPreview';
import NumberQuestionPreview from '../../../components/QuestionPreview/NumberQuestionPreview';
import NoQuestionPreview from '../../../components/QuestionPreview/NoQuestionPreview';
import EditFormSidebarRight from '../EditFormSidebarRight/EditFormSidebarRight';
import { themeConstants } from '../../../styles/theme.constants';

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

  if(question) {
    return (
      <>
      <Grid item xs={7}>
        <Grid
          container
          direction={'column'}
          alignContent={'center'}
          sx={{height: '100%', paddingTop: '10vh'}}
          mx={'auto'}
        >
              {questionPreview(question, setFormContext)}
        </Grid>
      </Grid>
      <Grid
        item xs={3}
        sx={{backgroundColor: 'white', border: themeConstants.border.base}}
      >
        <EditFormSidebarRight question={question} />
      </Grid>
      </>
    )
  }

  return (
    <Grid item xs={10}>
      <Box >
        <Typography variant="h4">
          No question selected
        </Typography>
      </Box>
    </Grid>
  )
  
  
}

export default EditFormMain;