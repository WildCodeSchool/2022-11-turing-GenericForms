import { Grid, List, ListItem, TextField } from '@mui/material';
import React from 'react';
import { FormDTO } from '../../types/form';
import { QuestionDTO } from '../../types/question';

interface SelectQuestionPreviewProps {
    question: QuestionDTO; //? provient du FormContext
    setFormContext: any;
};

const SelectQuestionPreview = ({question, setFormContext}: SelectQuestionPreviewProps) => {
    
    const handleChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormContext((formContext: FormDTO) => {
            return {
                ...formContext,
                questions: formContext.questions.map((questionCtx) => questionCtx.questionId === question.questionId ? {...question, title: event.target.value} : questionCtx)
            }
        });
    };

    const handleChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormContext((formContext: FormDTO) => {
            return {
                ...formContext,
                questions: formContext.questions.map((questionCtx) => questionCtx.questionId === question.questionId ? {...question, description: event.target.value} : questionCtx)
            }
        });
    };



    return (
        <Grid container direction={'column'}>
            <Grid item xs={12}>
                <TextField id="standard-basic" variant="standard" value={question.title} onChange={handleChangeTitle} />
            </Grid>
            <Grid item xs={12}>
                <TextField id="standard-basic" variant="standard" value={question.description} onChange={handleChangeDescription} />
            </Grid>
            <Grid item xs={12}>
                <List key={question.questionId}>
                {question.choices && question.choices.map((choice, index) => {
                    return (
                        <ListItem>
                            <TextField id="standard-basic" variant="standard" value={choice.text} key={choice.text+index}/>
                        </ListItem>
                    )
                })
                }
                 </List>
                {/* add a feature to add a choice */}
            </Grid>
        </Grid>
    )
};

export default SelectQuestionPreview;