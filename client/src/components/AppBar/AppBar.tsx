import React from 'react';
import './AppBar.css';
import { Toolbar, Typography, List, ListItem, ListItemText, Box, Container, Grid } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';

interface AppBarProps extends MuiAppBarProps {
    user?: UserDTO;
}

const AppBar = ({user}: AppBarProps) => {
    return (
        <Grid item xs={12} className='appbar-container'>
            <MuiAppBar position="relative" elevation={1} color="primary">
                <Toolbar>
                    <Typography>
                        Hello {user?.firstName || ''} ! Vous avez 3 formulaires en cours             
                    </Typography>
                </Toolbar>
            </MuiAppBar>
        </Grid>
    )
}

export default AppBar;

