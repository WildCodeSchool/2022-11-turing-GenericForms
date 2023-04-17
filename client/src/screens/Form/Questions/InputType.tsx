import { Grid, TextField, Typography } from '@mui/material';
import { notDeepEqual } from 'assert';
import React, { useContext, useState } from 'react';
import { useEditFormState } from '../../../providers/formState';
import { QuestionDTO } from '../../../types/question';
import { FormState, InitialFormState } from '../FormScreen';
import { FormContext } from './Questions';

interface Props {
    question: QuestionDTO;
};

const InputType = ({question}: Props) => {
    const { setFormData, formData } = useContext(FormContext);
    const value = formData.find((o: FormState) => o.id === `${question.questionId}`)?.answer;

    React.useEffect(() => {
        console.log("FormData initial", formData);
    }, [formData]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((formState: InitialFormState) => {
            return formState.map((e) => e.id === `${question.questionId}` ? {...e, answer: event.target.value} : e)
        });
    };

  return (
    <Grid container direction={'column'}>
    <Grid item xs={12}>
        <Typography id="standard-basic" >
            {question.title}
        </Typography>
    </Grid>
    <Grid item xs={12}>
        <TextField id="standard-basic" name={`${question.questionId}`} variant="standard" value={value} onChange={handleChange} />
    </Grid>
</Grid>

  )
}

export default InputType;