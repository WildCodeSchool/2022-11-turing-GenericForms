import { Grid, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { FormDTO } from '../../types/form';
import { QuestionDTO } from '../../types/question';

interface TextQuestionPreviewProps {
    question: QuestionDTO; //? provient du FormContext
    setFormContext: any;
}

const TextQuestionPreview = ({question, setFormContext}: TextQuestionPreviewProps) => {    

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormContext((formContext: FormDTO) => {
            return {
                ...formContext,
                questions: formContext.questions.map((questionCtx) => questionCtx.questionId === question.questionId ? {...question, title: event.target.value} : questionCtx)
            }
        });
    };

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormContext((formContext: FormDTO) => {
            return {
                ...formContext,
                questions: formContext.questions.map((questionCtx) => questionCtx.questionId === question.questionId ? {...question, description: event.target.value} : questionCtx)
            }
        });
    };

    return (
        <Grid container direction={'column'}>
            <Grid item xs={12}>
                <TextField id="standard-basic" variant="standard" value={question.title} onChange={handleChangeTitle} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="standard-basic" variant="standard" value={question.description} onChange={handleChangeDescription} />
            </Grid>
        </Grid>
    )
};

export default TextQuestionPreview;