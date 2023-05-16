import React from 'react';
import { IconButton, ListItem, TextField } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { ChoiceDTO } from '../../types/choice';

interface Props {
    choices: ChoiceDTO[];
    handleAddChoice: () => void;
    choiceValue: string;
    handleChangeNewChoice: (event: React.ChangeEvent<HTMLInputElement>) => void;
};


const AddListItem = ({choices, handleAddChoice, choiceValue, handleChangeNewChoice}: Props) => {

    return (
        <ListItem key={"add-choice"} >
            <IconButton onClick={handleAddChoice}>
                <AddCircleRoundedIcon />
            </IconButton>
            <TextField 
                    id="standard-basic" 
                    variant="standard" 
                    value={choiceValue} 
                    placeholder={choices.length === 0 ? "Choix 1" : "Ajouter un choix"}
                    onChange={handleChangeNewChoice}
                    multiline
            />
        </ListItem>
    )
};

export default AddListItem;