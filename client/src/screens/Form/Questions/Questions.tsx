import Stepper from '../Stepper';
import React, { createContext, useState } from 'react';
import QuestionView from './QuestionView';
import { Typography } from '@mui/material';
import { useEditFormState } from '../../../providers/formState';
import { InitialFormState } from '../FormScreen';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
    initialFormState: InitialFormState;
    defaultValues: any;
};

type FormContext = {
    activeStepIndex: number | undefined;
    setActiveStepIndex: React.Dispatch<React.SetStateAction<number>>;
    formData: InitialFormState;
    setFormData: React.Dispatch<React.SetStateAction<any>>;
};

export const FormContext = createContext<FormContext>({
    activeStepIndex: undefined,
    setActiveStepIndex: () => {},
    formData: [],
    setFormData: () => {},
});

//TODO : Dynamically create a validation schema => use setKey() from zod ?
const validationSchema = z.object({
    1: z.string().min(15, {message: 'Min 15 caractères'}).max(500),
    2: z.string().min(1).max(50),
    4: z.string().min(1).max(50),
    6: z.string().min(1).max(50),
    7: z.string().min(1).max(50),
});

type ValidationSchema = z.infer<typeof validationSchema>;

function Questions({initialFormState, defaultValues} : Props) {
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [formContext] = useEditFormState();
    const formMethods = useForm<ValidationSchema>({
        defaultValues: defaultValues,
        resolver: zodResolver(validationSchema),
        mode: 'onBlur',
    });

    const [formData, setFormData] = useState(initialFormState);

    React.useEffect(() => {
        console.log('initialFormState', initialFormState);
        console.log('formData', formData);
        console.log('defaultValues', defaultValues)
    }, []);

    const questionsNumber = formContext?.questions.length;
    
    formContext?.questions === undefined && <Typography>Ce questionnaire ne comporte aucune question :/</Typography>;

    return (
    <FormContext.Provider
        value={{ activeStepIndex, setActiveStepIndex, formData, setFormData }}
    >
        <FormProvider {...formMethods}> 
            <Stepper questionNumber={questionsNumber} />
            <div>{formContext.title}</div>
            <QuestionView questionNumber={questionsNumber}/>
        </FormProvider>
    </FormContext.Provider>

    )
}

export default Questions;