import React, { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Typography, List, ListItem, ListItemText, Drawer as MuiDrawer, IconButton, Divider, Toolbar, ListItemButton, ListItemIcon } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '../../../components/Drawer';
import { menuItems } from '../../../types/commonComponents';
import { CreateQuestionInput, QuestionDTO } from '../../../types/question';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import { FormDTO } from '../../../types/form';
import { QuestionType } from '../../../types/questionEnum';

interface EditFormSidebarProps {
    questions?: QuestionDTO[];
    setQuestionIndex: (questionIndex: number) => void;
    setFormContext: any;
    formContext: FormDTO;
}

const EditFormSidebar = ({questions, setQuestionIndex, setFormContext, formContext}: EditFormSidebarProps) => {

    const handleClick = (questionIndex: number) => {
        setQuestionIndex(questionIndex);
    };

    //TODO replace type by a variable type (depends on user selected type in a future dropdown select)
    const handleAddQuestion = () => {
        console.log("Add question");
        console.log(formContext);
       
        setFormContext((ctx: FormDTO) => {
            const createQuestionInput: CreateQuestionInput = {
                title: 'Nouvelle question',
                description: '',
                type: QuestionType.TEXT,
                formId: formContext.formId,
            };
            return {
                ...formContext,
                questions: [...formContext.questions, createQuestionInput]
            }
        });
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

