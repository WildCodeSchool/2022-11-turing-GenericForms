import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid, Typography  } from '@mui/material';
import { ReadOneQuestionDTO } from '../../../types/question';
import { QuestionType } from '../../../types/questionEnum';
import { useQuery } from '@apollo/client';
import { READ_QUESTION } from '../../../services/question.query';
import TextQuestionPreview from '../../../components/QuestionPreview/TextQuestionPreview';
import SelectQuestionPreview from '../../../components/QuestionPreview/SelectQuestionPreview';

interface EditFormMainProps {
  formId?: string;
  questionId: number | null;
}

const ShortTextComponent = () => {
  return (
    <div>Short text question</div>
  )
};

const LongTextComponent = () => {
  return (
    <div>Long text question</div>
  )
};

const NumberComponent = () => {
  return (
    <div>Number question</div>
  )
};


const QUESTION_PREVIEW = {
    text: <TextQuestionPreview />,
    shortText: <ShortTextComponent />,
    longText: <LongTextComponent />,
    number: <NumberComponent />,
    select: <SelectQuestionPreview />,
};
  //? Or we could have use a switch statement
  //? This one doesn't work because we should return a React component
  // const previewQuestion = (type: QuestionType) => {
  //   switch (type) {
  //     case QuestionType.SHORTTEXT:
  //       <div>Text question</div>;
  //       break;
  //     case QuestionType.LONGTEXT:
  //       <div>Long text question</div>;
  //       break;
  //     case QuestionType.NUMBER:
  //       <div>Number question</div>;
  //       break;
  //     case QuestionType.DATE:
  //       <div>Date question</div>;
  //       break;
  //     case QuestionType.CHECKBOX:
  //       <div>Checkbox question</div>;
  //       break;
  //     case QuestionType.RADIO:
  //       <div>Radio question</div>;
  //       break;
  //     case QuestionType.DROPDOWN:
  //       <div>Dropdown question</div>;
  //       break;
  //     default:
  //       <div>Unknown question type</div>;
  //       break;
  //   }
  // };


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

  if(data?.readQuestionById.type ) {
    return (
      <Grid item xs={10}>
        <Grid container direction={'column'}>
          <Grid item>
          {QUESTION_PREVIEW[data?.readQuestionById.type]}
          </Grid>
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