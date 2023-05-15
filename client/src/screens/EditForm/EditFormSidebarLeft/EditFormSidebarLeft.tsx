import React, { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Typography, List, ListItem, ListItemText, Drawer as MuiDrawer, IconButton, Divider, Toolbar, ListItemButton, ListItemIcon, Grid, Box } from '@mui/material';
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
import ShortTextIcon from '@mui/icons-material/ShortText';
import PlusOneIcon from '@mui/icons-material/PlusOne';
import { themeConstants } from '../../../styles/theme.constants';


interface EditFormSidebarLeftProps {
    questions?: QuestionDTO[];
    setQuestionIndex: (questionIndex: number) => void;
    setFormContext: any;
}

const EditFormSidebarLeft = ({questions, setQuestionIndex, setFormContext}: EditFormSidebarLeftProps) => {

    const handleClick = (questionIndex: number) => {
        setQuestionIndex(questionIndex);
    };

    //TODO replace type by a variable type (depends on user selected type in a future dropdown select)
    const handleAddQuestion = () => {
        console.log("Add question");
       
        setFormContext((formContext: FormDTO) => {
            console.log("formContext ===> ", formContext);
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
        <Grid item xs={2} sx={{backgroundColor: themeConstants.colors.white, border: '1px solid grey'}}>
            <Box sx={{border: '1px solid red', display: 'flex'}} >
                <IconButton onClick={handleAddQuestion} sx={{margin: '0 auto'}}>
                    <AddCircleRoundedIcon />
                </IconButton>
            </Box>
            <List>
            {questions && handleClick && questions.map(({title, type}, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                sx={{
                    minHeight: 48,
                    justifyContent: 'initial',
                    px: 2.5,
                }}
                onClick={() => handleClick(index)}
                >
                <ListItemIcon
                    sx={{
                    minWidth: 0,
                    mr: 3,
                    justifyContent: 'center',
                    }}
                >
                    {type === QuestionType.TEXT ? <ShortTextIcon /> : <PlusOneIcon />}
                </ListItemIcon>
                <ListItemText primary={title} />
                </ListItemButton>
            </ListItem>
            ))}
        </List>
      </Grid>
    )


    // return (
    //     <Drawer title='Questions' questions={questions} handleClick={handleClick}>
    //         <IconButton onClick={handleAddQuestion}>
    //             <AddCircleRoundedIcon />
    //         </IconButton>
    //     </Drawer>
    // )
}



export default EditFormSidebarLeft;

