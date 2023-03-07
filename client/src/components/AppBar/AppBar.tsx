import React from 'react';
import './AppBar.css';
import { Toolbar, Typography, List, ListItem, ListItemText, Box, Container, Grid, Button } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import { AppBarPropsColorOverrides } from '@mui/material/AppBar';

declare module "@mui/material/AppBar" {
    interface AppBarPropsColorOverrides{
      custom: true;
      paper: true;
    }
  }

interface AppBarProps extends MuiAppBarProps {
    user?: UserDTO;
    editForm?: boolean;
    handleSave?: () => void;
}

const AppBar = ({user, editForm, handleSave}: AppBarProps) => {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("userId");
        navigate("/");
      };

    return (
        <Grid item xs={12} className='appbar-container'>
            <MuiAppBar position="relative" elevation={1} sx={{bgcolor: "paper.light", zIndex: (theme) => theme.zIndex.drawer + 1 }} title="Appbar" >
                <Toolbar>
                    <Button
                        variant="contained"
                        onClick={() => null}
                        sx={{ mr: 2, minWidth: 20, minHeight: 40, borderRadius: 2 }}
                    >
                        <Typography variant='h4'>K</Typography>
                    </Button>
                    <Typography color='primary' sx={{ flexGrow: 1 }}>
                        Hello {user?.firstName || ''} ! Vous avez 3 formulaires en cours             
                    </Typography>
                    {editForm ? 
                        <Button variant='contained' sx={{ mr: 2, minWidth: 20, minHeight: 40, borderRadius: 2 }} onClick={handleSave}>Enregistrer</Button>
                        :
                        <Button onClick={handleLogOut} variant='contained' >Se déconnecter</Button>
                    }
                   

                </Toolbar>
            </MuiAppBar>
        </Grid>
    )
}

export default AppBar;

