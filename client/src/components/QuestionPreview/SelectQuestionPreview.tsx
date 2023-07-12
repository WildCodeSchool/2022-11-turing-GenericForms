import { Grid, IconButton, List, ListItem, TextField, FormHelperText, Box } from '@mui/material';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import React, { useEffect } from 'react';
import { FormDTO } from '../../types/form';
import { QuestionDTO } from '../../types/question';
import AddListItem from '../common/AddListItem';
import { ChoiceDTO } from '../../types/choice';
import ChoiceInput from '../common/ChoiceInput';
import { themeConstants } from '../../styles/theme.constants';


interface SelectQuestionPreviewProps {
    question: QuestionDTO; //? provient du FormContext
    setFormContext: any;
}

//TODO créer mutation pour ajouter une question : relier appel dans handleAddChoice
//TODO créer mutation pour supprimer une question : relier appel dans handleRemoveChoice

const SelectQuestionPreview = ({question, setFormContext}: SelectQuestionPreviewProps) => {
    const [newChoiceValue, setNewChoiceValue] = React.useState<string>("");

    useEffect(() => {
        setNewChoiceValue("");
    }, [question]);
    
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

    let questionOrderedChoices = [...question.choices];
    questionOrderedChoices = questionOrderedChoices.sort((a, b) => a.choiceId - b.choiceId);

    return (
        <Box minWidth={250}>
            <Box>
                <TextField
                    helperText="Titre de la question"
                    fullWidth
                    multiline
                    variant="standard"
                    value={question.title}
                    onChange={handleChangeTitle}
                />
            </Box>
            <Box>
                <TextField
                    helperText="Description de la question"
                    fullWidth
                    multiline
                    variant="standard"
                    value={question.description}
                    onChange={handleChangeDescription}
                />
            </Box>
            <Box>
                <List key={question.questionId}>
                {
                    question.choices 
                    && questionOrderedChoices
                        .map((choice) => {
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
            </Box>
        </Box>
    )
};

export default SelectQuestionPreview;