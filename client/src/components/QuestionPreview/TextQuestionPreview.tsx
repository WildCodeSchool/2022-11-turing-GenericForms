import { Box, TextField } from '@mui/material';
import React from 'react';
import { QuestionDTO } from '../../types/question';
import { useEditFormState } from '../../providers/formState';

interface TextQuestionPreviewProps {
    question: QuestionDTO; //? provient du FormContext
}

const TextQuestionPreview = ({question}: TextQuestionPreviewProps) => {
    const {setFormContext} = useEditFormState();    

    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormContext((form) => {
            if(!form) return;
            return {
                ...form,
                questions: form.questions.map((questionCtx) => questionCtx.questionId === question.questionId ? {...question, title: event.target.value} : questionCtx)
            }
        });
    };

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormContext((form) => {
            if(!form) return;
            return {
                ...form,
                questions: form.questions.map((questionCtx) => questionCtx.questionId === question.questionId ? {...question, description: event.target.value} : questionCtx)
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