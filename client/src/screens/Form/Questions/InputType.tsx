import { Grid, TextField, TextFieldProps, Typography } from '@mui/material';
import React, { useContext, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useEditFormState } from '../../../providers/formState';
import { QuestionDTO } from '../../../types/question';
import { InitialFormState } from '../FormScreen';
import { FormContext } from './Questions';

interface Props {
    question: QuestionDTO;
};

//! Validation isn't working
const mockedValidationRules = {
    required: true,
    minLength: 3,
    maxLength: 10,
};

const InputType = ({question}: Props) => {
    const { setFormData, formData } = useContext(FormContext);
    // const value = formData.find((o: FormState) => o.id === `${question.questionId}`)?.answer;
    const {register} = useFormContext();

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
        <TextField 
            id="standard-basic"
            // name={`${question.questionId}`} //? passed via register
            variant="standard" 
            // value={value} //? passed via register
            // onChange={handleChange} //? passed via register
            {...register(`${question.questionId}`,
                {
                    required: mockedValidationRules.required,
                    maxLength: mockedValidationRules.maxLength,
                    minLength: mockedValidationRules.minLength,
                    onChange: (e) => handleChange(e),
                }
            )}
        />
    </Grid>
</Grid>

  )
}

export default InputType;