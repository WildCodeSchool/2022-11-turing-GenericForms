import React from 'react';
import { Box, IconButton, ListItem, TextField } from '@mui/material';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { ChoiceDTO } from '../../types/choice';
import { QuestionDTO } from '../../types/question';
import { useEditFormState } from '../../providers/formState';

interface ChoiceInputProps {
    choice: ChoiceDTO;
    handleRemoveChoice: () => void;
    question: QuestionDTO;
}

const ChoiceInput = ({choice, handleRemoveChoice, question}: ChoiceInputProps) => {
    const [changeChoiceValue, setChangeChoiceValue] = React.useState<string>(choice.text);
    const {setFormContext} = useEditFormState();

    const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
        setChangeChoiceValue(event.target.value);
    };

    const handleChangeChoice = (choice: ChoiceDTO) => {
        setFormContext((form) => {
            if(!form) return;
            const newChoices = question.choices.map((choiceCtx) => choiceCtx.choiceId === choice.choiceId ? {...choice, text: changeChoiceValue} : choiceCtx);
            console.log("newChoices: ", newChoices);
            const newFormContext = {
                ...form,
                questions: form.questions.map((questionCtx) => questionCtx.questionId === question.questionId ? {...question, choices: newChoices} : questionCtx)
            };
            
            return newFormContext;
        });
    };

    return (
        <ListItem>
                <Box>
                    <TextField
                        multiline
                        fullWidth
                        id="standard-basic"
                        variant="standard"
                        value={changeChoiceValue}
                        key={choice.text}
                        onBlur={e => handleChangeChoice(choice)}
                        onChange={handleChangeValue}
                    />
                </Box>
            <IconButton onClick={handleRemoveChoice}>
                <RemoveCircleRoundedIcon />
            </IconButton>
        </ListItem>
    );
};

export default ChoiceInput;