import React from 'react';
import { Grid, IconButton, List, ListItem, TextField } from '@mui/material';
import FormControl, { useFormControl } from '@mui/material/FormControl';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { DebounceInput } from 'react-debounce-input';
import { ChoiceDTO } from '../../types/choice';
import { FormDTO } from '../../types/form';
import { QuestionDTO } from '../../types/question';

interface ChoiceInputProps {
    choice: ChoiceDTO;
    handleRemoveChoice: () => void;
    setFormContext: any;
    question: QuestionDTO;
};

const ChoiceInput = ({choice, handleRemoveChoice, setFormContext, question}: ChoiceInputProps) => {
    const [changeChoiceValue, setChangeChoiceValue] = React.useState<string>(choice.text);

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangeChoiceValue(event.target.value);
    };

    const handleChangeChoice = (choice: ChoiceDTO) => {
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

    return (
        <ListItem>
            {/* <DebounceInput id="standard-basic" variant="standard" value={choice.text} key={choice.text+index} onChange={e => handleChangeChoice(e, choice)} minLength={1} debounceTimeout={500} placeholder="Choix 1"/> */}
            <FormControl >
                <TextField id="standard-basic" variant="standard" value={changeChoiceValue} key={choice.text} onBlur={e => handleChangeChoice(choice)} onChange={handleChangeValue} />
            </FormControl>
            <IconButton onClick={handleRemoveChoice}>
                <RemoveCircleRoundedIcon />
            </IconButton>
        </ListItem>
    );
};

export default ChoiceInput;