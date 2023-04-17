import React, { useContext, useEffect } from 'react';
import { useEditFormState } from '../../../providers/formState';
import ErrorType from './ErrorType';
import InputType from './InputType';
import { FormContext } from './Questions';
import SelectType from './SelectType';

interface Props {};

function QuestionView({}: Props) {
    const { activeStepIndex } = useContext<any>(FormContext);
    const [formContext] = useEditFormState();

    useEffect(() => {
        console.log(formContext?.questions[activeStepIndex]);
    }, [formContext?.questions, activeStepIndex]);

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