import React, { useContext, useEffect } from 'react';
import {Grid, Typography} from '@mui/material';
import { useEditFormState } from '../../../providers/formState';
import ErrorType from './QuestionsTypes/ErrorType';
import InputType from './QuestionsTypes/InputType';
import { FormContext } from './Questions';
import SelectType from './QuestionsTypes/SelectType';
import SubmitView from './SubmitView';

interface Props {
    questionNumber: number | undefined;
    setQuestionId: React.Dispatch<React.SetStateAction<number>>;
    formId: number | undefined;
}

function QuestionView({questionNumber, setQuestionId, formId}: Props) {
    const { activeStepIndex } = useContext<FormContext>(FormContext);
    const {formContext} = useEditFormState();

    useEffect(() => {
        console.log(formContext?.questions[activeStepIndex]);
        setQuestionId(formContext?.questions[activeStepIndex]?.questionId || 0);
    }, [formContext?.questions, activeStepIndex]);

    const getQuestionType = () => {
        switch (formContext?.questions[activeStepIndex].type) {
            case 'text':
                return <InputType question={formContext?.questions[activeStepIndex]} />;
            case 'select':
                return <SelectType question={formContext?.questions[activeStepIndex]} />;
            default:
                return <ErrorType />
        }
    }

    if(activeStepIndex === questionNumber) return (
                <SubmitView formId={formId} />
    );

    return (
        <Grid container sx={{minHeight: '20vh'}} direction={'column'} justifyContent='space-around' alignContent='center'>
            <Grid item xs={12}>
                <Typography id="standard-basic" align='center' >
                    {formContext?.questions[activeStepIndex].title}
                </Typography>
            </Grid>
            <Grid item xs={12}>
                {getQuestionType()}
            </Grid>
        </Grid>
    
    )
}

export default QuestionView;