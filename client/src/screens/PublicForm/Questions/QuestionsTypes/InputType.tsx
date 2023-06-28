import { Grid, TextField, Typography } from '@mui/material';
import React, { useContext } from 'react';
import { useFormContext } from 'react-hook-form';
import { QuestionDTO } from '../../../../types/question';
import { InitialFormState } from '../../PublicFormScreen';
import { FormContext } from '../Questions';

interface Props {
    question: QuestionDTO;
};

const InputType = ({question}: Props) => {
    const { setFormData, formData } = useContext(FormContext);
    const {register, formState: {errors}, trigger} = useFormContext();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((formState: InitialFormState) => {
            return formState.map((e) => e.id === `${question.questionId}` ? {...e, answer: event.target.value} : e)
        });
    };

  return (
    <>
        <Grid item xs={12}>
            <TextField 
                id="standard-basic"
                variant="standard"
                placeholder={question.description}
                {...register(`${question.questionId}`, {onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => handleChange(e)})}
            />
            {errors && errors?.[`${question.questionId}`]?.message as string && (
                <Typography>
                    {errors?.[`${question.questionId}`]?.message as string}
                </Typography>
            )}
        </Grid>
    </>

  )
}

export default InputType;