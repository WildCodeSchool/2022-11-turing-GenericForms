import { Grid, IconButton, List, ListItem, TextField, FormHelperText } from '@mui/material';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import React, { useEffect } from 'react';
import { FormDTO } from '../../types/form';
import { QuestionDTO } from '../../types/question';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import AddListItem from '../common/AddListItem';
import { ChoiceDTO } from '../../types/choice';
import { DebounceInput } from 'react-debounce-input';


interface SelectQuestionPreviewProps {
    question: QuestionDTO; //? provient du FormContext
    setFormContext: any;
};

//TODO créer mutation pour ajouter une question : relier appel dans handleAddChoice
//TODO créer mutation pour supprimer une question : relier appel dans handleRemoveChoice

const SelectQuestionPreview = ({question, setFormContext}: SelectQuestionPreviewProps) => {
    const [newChoiceValue, setNewChoiceValue] = React.useState<string>("");
    const [changeChoiceValue, setChangeChoiceValue] = React.useState<string>("");

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

    const handleChangeChoice = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, choice: ChoiceDTO) => {

        //TODO update choice value in question choices array 
            //? find question index in formContext.questions array
            //? target choice in choices array => use choice id ?
            //? update choice text
        setFormContext((formContext: FormDTO) => {
            const newChoices = question.choices.map((choiceCtx) => choiceCtx.choiceId === choice.choiceId ? {...choice, text: changeChoiceValue} : choiceCtx);
            console.log("newChoices: ", newChoices);
            const newFormContext = {
                ...formContext,
                questions: formContext.questions.map((questionCtx) => questionCtx.questionId === question.questionId ? {...question, choices: newChoices} : questionCtx)
            };
            
            return newFormContext;
          
        });
    };

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangeChoiceValue(event.target.value);
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
                            {/* <DebounceInput id="standard-basic" variant="standard" value={choice.text} key={choice.text+index} onChange={e => handleChangeChoice(e, choice)} minLength={1} debounceTimeout={500} placeholder="Choix 1"/> */}
                            <FormControl >
                                <TextField id="standard-basic" variant="standard" value={changeChoiceValue} key={choice.text+index} onBlur={e => handleChangeChoice(e, choice)} onChange={handleChangeValue} />
                            </FormControl>
                            <IconButton onClick={handleRemoveChoice}>
                                <RemoveCircleRoundedIcon />
                            </IconButton>
                        </ListItem>
                    )
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