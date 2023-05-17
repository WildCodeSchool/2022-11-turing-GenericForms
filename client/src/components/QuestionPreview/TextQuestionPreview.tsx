import { Box, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { FormDTO } from '../../types/form';
import { QuestionDTO } from '../../types/question';
import { themeConstants } from '../../styles/theme.constants';

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
        <Box minWidth={250}>
                <Box>
                    <TextField
                        helperText="Titre de la question"
                        fullWidth multiline
                        id="standard-basic"
                        variant="standard"
                        value={question.title}
                        onChange={handleChangeTitle} />
                </Box>
                <Box>
                    <TextField 
                        helperText="Description de la question"
                        fullWidth multiline
                        id="standard-basic"
                        variant="standard"
                        value={question.description}
                        onChange={handleChangeDescription} />
                </Box>
        </Box>
    )
};

export default TextQuestionPreview;