import React, { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Typography, List, ListItem, ListItemText, Drawer as MuiDrawer, IconButton, Divider, Toolbar, ListItemButton, ListItemIcon } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '../../../components/Drawer';
import { menuItems } from '../../../types/commonComponents';
import { QuestionDTO } from '../../../types/question';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { FormDTO } from '../../../types/form';

interface EditFormSidebarProps {
    questions?: QuestionDTO[];
    setQuestionIndex: (questionIndex: number) => void;
    setFormContext: any;
}

const EditFormSidebar = ({questions, setQuestionIndex, setFormContext}: EditFormSidebarProps) => {

    const handleClick = (questionIndex: number) => {
        setQuestionIndex(questionIndex);
    };

    const handleAddQuestion = () => {
        console.log("Add question");
    }

    //TODO : handle case where no questions are passed or empty questions array
    // => display drawer with no items and a message "Vite, créer votre première question !"
    return (
        <Drawer title='Questions' questions={questions} handleClick={handleClick}>
            <IconButton onClick={handleAddQuestion}>
                <AddCircleRoundedIcon />
            </IconButton>
        </Drawer>
    )
}



export default EditFormSidebar;

