import React from 'react';
import './AppBar.css';
import { Toolbar, Typography, List, ListItem, ListItemText, Box, Container, Grid } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

interface AppBarProps extends MuiAppBarProps {}

const AppBar = ({}: AppBarProps) => {
    return (
        <Grid item xs={12} className='appbar-container'>
            <MuiAppBar position="relative" elevation={1} color="primary">
                <Toolbar>
                    <Typography>
                        Aujourd'hui vous avez 3 formulaires Michel               
                    </Typography>
                </Toolbar>
            </MuiAppBar>
        </Grid>
    )
}

export default AppBar;

