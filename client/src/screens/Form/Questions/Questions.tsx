import Stepper from '../Stepper';
import React, { createContext, useState } from 'react';
import { QuestionDTO } from '../../../types/question';
import QuestionItem from './QuestionView';
import { Typography } from '@mui/material';
import { useEditFormState } from '../../../providers/formState';
export const FormContext = createContext<FormContext>({
    activeStepIndex: undefined,
    setActiveStepIndex: () => {},
    formData: {},
    setFormData: () => {},
});

interface Props {};

type FormContext = {
    activeStepIndex: number | undefined;
    setActiveStepIndex: React.Dispatch<React.SetStateAction<number>>;
    formData: any;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
};

function Questions({} : Props) {
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [formData, setFormData] = useState({});
    const [formContext, setFormContext] = useEditFormState();
    const questionsNumber = formContext?.questions.length;
    
    formContext?.questions === undefined && <Typography>Ce questionnaire ne comporte aucune question :/</Typography>;

    return (
    <FormContext.Provider
        value={{ activeStepIndex, setActiveStepIndex, formData, setFormData }}
    >
        <Stepper questionNumber={questionsNumber} />
        <div>Formulaire #1</div>
        <QuestionItem />
    </FormContext.Provider>

    )
}

export default Questions;