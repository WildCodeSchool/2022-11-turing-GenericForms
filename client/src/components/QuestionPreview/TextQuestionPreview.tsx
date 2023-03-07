import { Grid, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { QuestionDTO } from '../../types/question';

interface TextQuestionPreviewProps {
    question: QuestionDTO;
    setQuestions: React.Dispatch<React.SetStateAction<QuestionDTO[]>>;
}

const TextQuestionPreview = ({question, setQuestions}: TextQuestionPreviewProps) => {
    const [localQuestion, setLocalQuestion] = React.useState<QuestionDTO>(question);

    useEffect(() => {
        setLocalQuestion(question);
    }, [question]);

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalQuestion({...localQuestion, title: event.target.value});
        //Add local change question in the questions array from EditFormScreen
        setQuestions((questions) => questions.map((question) => question.questionId === localQuestion.questionId ? localQuestion : question));
    };

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setLocalQuestion({...localQuestion, description: event.target.value});
        setQuestions((questions) => questions.map((question) => question.questionId === localQuestion.questionId ? localQuestion : question));
    };

    //! prefer using onBlur false to call setQuestion when user change question text ? 


    return (
        <Grid container direction={'column'}>
            <Grid item xs={12}>
                <TextField id="standard-basic" variant="standard" value={localQuestion.title} onChange={handleChangeTitle} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="standard-basic" variant="standard" value={localQuestion.description} onChange={handleChangeDescription} />
            </Grid>
        </Grid>
    )
};

export default TextQuestionPreview;