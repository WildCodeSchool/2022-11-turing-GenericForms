import React from 'react';
import './AppBar.css';
import { Toolbar, Typography, Box, Grid, Button, Switch, Theme, Link } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import { useEditFormState } from '../../providers/formState';
import { FormDTO } from '../../types/form';
import theme from '../../styles/theme';
import Popover from '../../screens/EditForm/EditFormSidebarRight/Popover';

declare module "@mui/material/AppBar" {
    interface AppBarPropsColorOverrides{
      custom: true;
      paper: true;
    }
  }

interface AppBarProps extends MuiAppBarProps {
    user?: UserDTO;
    form?: FormDTO;
    editForm?: boolean;
    handleSave?: () => void;
}

const useCss = (theme: Theme) => ({
    centerTxt: {
        textAlign: 'center',
    },
});

const AppBar = ({user, form, editForm, handleSave}: AppBarProps) => {
    const css = useCss(theme);
    const navigate = useNavigate();
    const [formContext, setFormContext] = useEditFormState();

    const handleLogOut = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleChangeVisibility = () => {
        setFormContext((formContext: FormDTO) => {
            return {
                ...formContext,
                visibility: !formContext.visibility
            }
        });
    };

    const popoverContent = (
        <Box sx={{ p: 2, maxWidth: "40vw" }}>
            <Typography>Vous pouvez prévisualiser ce formulaire en cliquant sur ce lien :</Typography>
            <Typography>
                <Link href={`http://localhost:3000/form/${form?.formId}?preview=true`} target="_blank">
                    Formulaire {form?.title}
                </Link>
            </Typography>
            <Typography paddingTop={2}>Attention, vos modifications non sauvegardées ne seront pas visibles !</Typography>
        </Box>

    );

    return (
        <Grid item xs={12} className='appbar-container'>
            <MuiAppBar position="relative" elevation={1} sx={{bgcolor: "paper.light", zIndex: (theme) => theme.zIndex.drawer + 1 }} title="Appbar" >
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        onClick={() => null}
                        sx={{ mr: 2, minWidth: 20, minHeight: 40, borderRadius: 2 }}
                    >
                        <Typography variant='h4'>K</Typography>
                    </Button>
                    {!editForm &&
                    <Typography color='primary' sx={{ flexGrow: 1 }}>
                        Hello {user?.firstName || ''} ! Vous avez 3 formulaires en cours             
                    </Typography>
                    }
                    {editForm ?
                        (   <>
                            <Typography variant='h6' color='primary'>
                                {form?.title}
                            </Typography>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                                <Typography variant='body1' color='primary'>
                                    Publier : 
                                </Typography>
                                <Switch 
                                    color='success' 
                                    checked={form?.visibility}
                                    onChange={handleChangeVisibility}
                                />
                                <Button
                                    variant='contained'
                                    sx={{ mr: 2, minWidth: 15, minHeight: 35, borderRadius: 2 }}
                                    onClick={handleSave}
                                >
                                    Enregistrer
                                </Button>
                                <Popover 
                                    btnTitle='Prévisualiser'
                                    children={popoverContent}
                                    btnColor='info'
                                />
                            </Box>
                            </>
                        )
                        :
                        <Button onClick={handleLogOut} variant='contained' >Se déconnecter</Button>
                    }
                   

                </Toolbar>
            </MuiAppBar>
        </Grid>
    )
}

export default AppBar;

