import { Grid, IconButton, List, ListItem, TextField, FormHelperText } from '@mui/material';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import React, { useEffect } from 'react';
import { FormDTO } from '../../types/form';
import { QuestionDTO } from '../../types/question';
import AddListItem from '../common/AddListItem';
import { ChoiceDTO } from '../../types/choice';
import ChoiceInput from '../common/ChoiceInput';


interface SelectQuestionPreviewProps {
    question: QuestionDTO; //? provient du FormContext
    setFormContext: any;
};

//TODO créer mutation pour ajouter une question : relier appel dans handleAddChoice
//TODO créer mutation pour supprimer une question : relier appel dans handleRemoveChoice

const SelectQuestionPreview = ({question, setFormContext}: SelectQuestionPreviewProps) => {
    const [newChoiceValue, setNewChoiceValue] = React.useState<string>("");

    useEffect(() => {
        setNewChoiceValue("");
    }, [question]);
    
    //TODO add a debouncer wrapper to avoid too many calls to the server
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

    const handleAddChoice = () => {
        console.log("add choice with text: ", newChoiceValue);
    };

    const handleRemoveChoice = () => {
        console.log("remove choice");
    };

    const handleChangeNewChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewChoiceValue(event.target.value);
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
                {
                    question.choices && question.choices.map((choice) => {
                        return <ChoiceInput choice={choice} question={question} handleRemoveChoice={handleRemoveChoice} setFormContext={setFormContext} />
                    })
                }
                {/*TODO complete the feature to add a choice */}
                    <AddListItem 
                        choices={question.choices}
                        handleAddChoice={handleAddChoice}
                        choiceValue={newChoiceValue}
                        handleChangeNewChoice={handleChangeNewChoice}
                    />
                 </List>
            </Grid>
        </Grid>
    )
};

export default SelectQuestionPreview;