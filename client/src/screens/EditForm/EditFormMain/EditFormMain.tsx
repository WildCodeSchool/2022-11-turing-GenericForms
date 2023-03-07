import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Grid, Typography  } from '@mui/material';
import { QuestionDTO, ReadOneQuestionDTO } from '../../../types/question';
import { QuestionType } from '../../../types/questionEnum';
import { useQuery } from '@apollo/client';
import { READ_QUESTION } from '../../../services/question.query';
import TextQuestionPreview from '../../../components/QuestionPreview/TextQuestionPreview';
import SelectQuestionPreview from '../../../components/QuestionPreview/SelectQuestionPreview';
import NumberQuestionPreview from '../../../components/QuestionPreview/NumberQuestionPreview';
import NoQuestionPreview from '../../../components/QuestionPreview/NoQuestionPreview';

interface EditFormMainProps {
  formId?: string;
  questionId: number | undefined;
  questions: QuestionDTO[] | undefined;
  setQuestions: React.Dispatch<React.SetStateAction<QuestionDTO[]>>;
}

const questionPreview = (question: QuestionDTO, setQuestions: React.Dispatch<React.SetStateAction<QuestionDTO[]>>) => {
  switch (question.type) {
    case QuestionType.TEXT:
      return <TextQuestionPreview question={question} setQuestions={setQuestions} />;
    case QuestionType.NUMBER:
      return <NumberQuestionPreview />;
    case QuestionType.SELECT:
      return <SelectQuestionPreview />;
    default:
      return <NoQuestionPreview />;
  };
};

function EditFormMain({formId, questionId, questions, setQuestions}: EditFormMainProps) {
  const navigate = useNavigate();

  useEffect(()  => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, [navigate]);

  // const {data: question, loading: questionLoading, error: questionError} = useQuery<ReadOneQuestionDTO>(READ_QUESTION, {
  //   variables: { questionId},
  //   onCompleted(data: ReadOneQuestionDTO) {
  //     console.log(data);
  //   },
  //   onError(error: any) {
  //       console.log(error);
  //   }
  // });
  //! try to get the question using questionId from the form data
  let question = {} as QuestionDTO | undefined;
  if(questions && questionId) {
    question = questions.find((question) => question.questionId === questionId);
  }

  //TODO get form data information and pass it to questionPreview
  //? => access form theme colors customization

  if(question ) {
    return (
      <Grid item xs={10}>
            {questionPreview(question, setQuestions)}
            {/* <Typography variant="h4">
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
            </Typography> */}
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