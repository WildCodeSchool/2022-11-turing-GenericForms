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

interface EditFormSidebarProps {
    questions?: QuestionDTO[];
    setQuestionId: (questionId: number) => void;
}

const EditFormSidebar = ({questions, setQuestionId}: EditFormSidebarProps) => {

    const handleClick = (questionId: number) => {
        console.log('clicked on question #', questionId);
        setQuestionId(questionId);
    };
    
    //TODO : handle case where no questions are passed or empty questions array
    // => display drawer with no items and a message "Vite, créer votre première question !"
    return (
        <Drawer title='Notifications' questions={questions} handleClick={handleClick} />
    )
}



export default EditFormSidebar;

