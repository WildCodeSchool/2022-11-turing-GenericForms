import React, { useState } from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { Typography, List, ListItem, ListItemText, Drawer as MuiDrawer, IconButton, Divider, Toolbar, ListItemButton, ListItemIcon } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronLeft';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '../../../components/Drawer';
import { menuItems } from '../../../types/commonComponents';


const items: menuItems = [
    { title: 'Inbox', icon: <InboxIcon /> },
    { title: 'Mail', icon: <MailIcon /> },
]

const DashboardSidebar = () => {

    return (
       <Drawer title='Notifications' menuItems={items} />
    )
}



export default DashboardSidebar;

