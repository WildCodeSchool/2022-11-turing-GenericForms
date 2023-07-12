import Stepper from '../Stepper/Stepper';
import React, { createContext, useState } from 'react';
import QuestionView from './QuestionView';
import { Grid, Typography } from '@mui/material';
import { useEditFormState } from '../../../providers/formState';
import { InitialFormState } from '../PublicFormScreen';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { createSchema } from '../../../utils/schema.utils';
import { DefaultValues } from '../../../types/publicForm';

interface Props {
    initialFormState: InitialFormState;
    defaultValues: DefaultValues;
}

export type FormContext = {
    activeStepIndex: number;
    setActiveStepIndex: React.Dispatch<React.SetStateAction<number>> | undefined;
    formData: InitialFormState;
    setFormData: React.Dispatch<React.SetStateAction<InitialFormState>> | undefined;
};

export const FormContext = createContext<FormContext>({
    activeStepIndex: 0,
    setActiveStepIndex: undefined,
    formData: [],
    setFormData: undefined,
});

// const validationSchema = z.object({
//     1: z.string().min(10, {message: 'Min 10 caractères'}).max(500),
//     2: z.string().min(5).max(50),
//     4: z.string().min(1).max(50),
//     6: z.string().min(1).max(50),
//     7: z.string().min(1).max(50),
// });

//TODO transfer schema creation logic into FormScreen.tsx and import though props ?

function Questions({initialFormState, defaultValues} : Props) {
    const [activeStepIndex, setActiveStepIndex] = useState(0);
    const [questionId, setQuestionId] = React.useState<number>(0);
    const {formContext} = useEditFormState();
    const schema = createSchema(initialFormState);
    type ValidationSchema = z.infer<typeof schema>;
    const formMethods = useForm<ValidationSchema>({
        defaultValues: defaultValues,
        resolver: zodResolver(schema),
        mode: 'onChange',
    });
    const [formData, setFormData] = useState(initialFormState);

    React.useEffect(() => {
        console.log('initialFormState', initialFormState);
        console.log('formData', formData);
        console.log('defaultValues', defaultValues)
        console.log("dynamic schema ===>", createSchema(initialFormState));
    }, []);

    const questionsNumber = formContext?.questions.length;
    
    formContext?.questions === undefined && <Typography>Ce questionnaire ne comporte aucune question :/</Typography>;

    return (
    <FormContext.Provider
        value={{ activeStepIndex, setActiveStepIndex, formData, setFormData }}
    >
        <FormProvider {...formMethods}>
            <Grid container sx={{minHeight: '100vh'}} justifyContent='center' >
                <Grid item xs={12} >
                    <Typography variant="h2" align='center' sx={{maxHeight: '5vh'}}>{formContext?.title}</Typography>
                </Grid>
                <Grid item xs={8} sx={{minHeight: '40vh'}} alignSelf='center'>
                    <form>
                        <QuestionView questionNumber={questionsNumber} setQuestionId={setQuestionId} formId={formContext?.formId}/>
                    </form>
                </Grid>
                <Grid item xs={12} sx={{minHeight: '10vh'}}>
                    <Stepper questionNumber={questionsNumber} questionId={questionId}/>
                </Grid>
            </Grid>
        </FormProvider>
    </FormContext.Provider>

    )
}

export default Questions;