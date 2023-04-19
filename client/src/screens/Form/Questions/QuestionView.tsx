import { Button } from '@mui/material';
import React, { useContext, useEffect } from 'react';
import { useEditFormState } from '../../../providers/formState';
import ErrorType from './ErrorType';
import InputType from './InputType';
import { FormContext } from './Questions';
import SelectType from './SelectType';
import SubmitView from './SubmitView';

interface Props {
    questionNumber: number;
};

function QuestionView({questionNumber}: Props) {
    const { activeStepIndex } = useContext<any>(FormContext);
    const [formContext] = useEditFormState();

    useEffect(() => {
        console.log(formContext?.questions[activeStepIndex]);
    }, [formContext?.questions, activeStepIndex]);

    if(activeStepIndex === questionNumber) return (
       <SubmitView />
    );

    switch (formContext?.questions[activeStepIndex].type) {
        case 'text':
            return <InputType question={formContext?.questions[activeStepIndex]} />;
        case 'select':
            return <SelectType question={formContext?.questions[activeStepIndex]} />;
        default:
            return <ErrorType />
    }
}

export default QuestionView;