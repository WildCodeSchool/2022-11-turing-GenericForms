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
    formId?: string;
    questions?: QuestionDTO[];
}

const EditFormSidebar = ({formId, questions}: EditFormSidebarProps) => {
    //TODO - create menuItems from questions => adapt Drawer component to accept questions as menuItems : custom icon + title

    return (
        <Drawer title='Notifications' questions={questions} />
    )
}



export default EditFormSidebar;

