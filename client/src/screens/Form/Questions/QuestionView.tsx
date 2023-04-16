import React, { useContext, useEffect } from 'react';
import { useEditFormState } from '../../../providers/formState';
import { FormContext } from './Questions';

interface Props {};

function QuestionView({}: Props) {
    const { activeStepIndex } = useContext<any>(FormContext);
    const [formContext, setFormContext] = useEditFormState();

    useEffect(() => {
        console.log(formContext?.questions[activeStepIndex]);
    }, [formContext?.questions, activeStepIndex]);

    return (
        <>
            <div>Question number {activeStepIndex + 1} </div>
            <div>{formContext?.questions[activeStepIndex].title}</div>
        </>
    )
}

export default QuestionView;