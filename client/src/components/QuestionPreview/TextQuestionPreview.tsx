import { Grid, TextField, Typography } from '@mui/material';
import React from 'react';
import { QuestionDTO } from '../../types/question';

interface TextQuestionPreviewProps {
    question: QuestionDTO;
}

const TextQuestionPreview = ({question}: TextQuestionPreviewProps) => {

    return (
        <Grid container direction={'column'}>
            <Grid item xs={12}>
                <TextField id="standard-basic" variant="standard" value={question.title} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="standard-basic" variant="standard" value={question.description} />
            </Grid>
        </Grid>
    )
};

export default TextQuestionPreview;