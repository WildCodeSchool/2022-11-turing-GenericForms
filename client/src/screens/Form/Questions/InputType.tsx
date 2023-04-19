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

const InputType = ({question}: Props) => {
    const { setFormData, formData } = useContext(FormContext);
    const {register, formState: {errors}} = useFormContext();

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
            variant="standard" 
            {...register(`${question.questionId}`, {onChange: (e) => handleChange(e)})}
        />
         {errors && errors?.[`${question.questionId}`]?.message as string && (
          <Typography>
              {errors?.[`${question.questionId}`]?.message as string}
          </Typography>
      )
    }
       
    </Grid>
</Grid>

  )
}

export default InputType;