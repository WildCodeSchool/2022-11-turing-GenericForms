import React from 'react';
import './AppBar.css';
import { Toolbar, Typography, Box, Grid, Button, Switch, Theme, Link } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import { useEditFormState } from '../../providers/formState';
import { FormDTO } from '../../types/form';
import theme from '../../styles/theme';
import Popover from '../../screens/EditForm/EditFormSidebarRight/Popover';
import { themeConstants } from '../../styles/theme.constants';
import { getPlural } from '../../utils/text.utils';
import {Check, Clear} from '@mui/icons-material';
import { getFirstLetter } from '../../utils/string.utils';


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

const DisabledToggleIcon = () => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: themeConstants.colors.error, borderRadius: themeConstants.radius.full }} >
            <Clear sx={{color: 'white'}} />
        </Box>
    )
};

const ActiveToggleIcon = () => {
    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: themeConstants.colors.success, borderRadius: themeConstants.radius.full }} >
            <Check sx={{color: 'white'}} />
        </Box>
    )
};

const AppBar = ({user, form, editForm, handleSave}: AppBarProps) => {
    const css = useCss(theme);
    const navigate = useNavigate();
    const {setFormContext} = useEditFormState();

    const handleLogOut = () => {
        localStorage.clear();
        navigate("/login");
    };

    const handleChangeVisibility = () => {
        console.log(form?.visibility);
        setFormContext((formContext) => {
            if(formContext) {
            return {
                ...formContext,
                visibility: !formContext?.visibility
            }
        }
        });
    };

    const popoverContent = (
        <Box sx={{ p: 2, maxWidth: "40vw" }}>
            <Typography>Vous pouvez prévisualiser ce formulaire en cliquant sur ce lien :</Typography>
            <Typography>
                <Link href={`http://localhost:3000/form/${form?.formId || 0}?preview=true`} target="_blank">
                    Formulaire {form?.title}
                </Link>
            </Typography>
            <Typography paddingTop={2}>Attention, vos modifications non sauvegardées ne seront pas visibles !</Typography>
        </Box>

    );

    return (
        <Grid item xs={12} className='appbar-container'>
            <MuiAppBar position="relative" elevation={1} sx={{bgcolor: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }} title="Appbar" >
                <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Button
                        variant="contained"
                        onClick={() => null}
                        color='info'
                        sx={{ mr: 2, minWidth: 20, minHeight: 40, borderRadius: themeConstants.radius.full }}
                    >
                        <Typography variant='h4'>{getFirstLetter(user?.firstName)}</Typography>
                    </Button>
                    {!editForm &&
                    <Typography color='primary' sx={{ flexGrow: 1 }}>
                        Hello {user?.firstName || ''} ! Vous avez {user?.forms.length || ''} {getPlural(user?.forms.length, 'formulaire')} en cours.             
                    </Typography>
                    }
                    {editForm ?
                        (   <>
                            <Box sx={{display: 'flex', flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}>
                            {form?.visibility && (
                                <Link href={`http://localhost:3000/form/${form?.formId}`} target="_blank">
                                <Typography variant='body1'>
                                Lien du formulaire
                                </Typography>
                                </Link>
                                )}
                                <Switch 
                                    color='success' 
                                    checked={form?.visibility}
                                    onChange={handleChangeVisibility}
                                    icon={<DisabledToggleIcon />}
                                    checkedIcon={<ActiveToggleIcon />}
                                />
                            </Box>
                            <Box sx={{display: 'flex', flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Typography variant='h6' color={themeConstants.colors.mediumGrey}>
                                    {form?.title}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
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

