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
import { useEditFormState } from '../../../providers/formState';

interface EditFormMainProps {
  questionIndex: number | undefined;
  questions: QuestionDTO[] | undefined; //? proviennent du FormContext
}

const questionPreview = (question: QuestionDTO) => {
  switch (question.type) {
    case QuestionType.TEXT:
      return <TextQuestionPreview question={question} />;
    case QuestionType.NUMBER:
      return <NumberQuestionPreview />;
    case QuestionType.SELECT:
      return <SelectQuestionPreview question={question} />;
    default:
      return <NoQuestionPreview />;
  }
};

function EditFormMain({questionIndex, questions}: EditFormMainProps) {
  const navigate = useNavigate();
  const {setFormContext} = useEditFormState();

  useEffect(()  => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  let question = undefined as QuestionDTO | undefined;
  if(questions && typeof questionIndex !== 'undefined') {
    question = questions[questionIndex];
  }

  if(question) {
    return (
      <>
      <Grid item xs={6}>
        <Grid
          container
          direction={'column'}
          alignContent={'center'}
          sx={{height: '100%', paddingTop: '10vh'}}
          mx={'auto'}
        >
              {questionPreview(question)}
        </Grid>
      </Grid>
      <Grid
        item xs={4}
        sx={{backgroundColor: 'white', border: themeConstants.border.base}}
      >
        <EditFormSidebarRight question={question} questionIndex={questionIndex} />
      </Grid>
      </>
    )
  }

  return (
    <Grid item xs={10}>
    <Box
      sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%'}}
      marginTop={themeConstants.spacing.baseSm}
    >
        <Typography variant="h4">
          Aucune question sélectionnée !
        </Typography>
      </Box>
    </Grid>
  )
  
  
}

export default EditFormMain;