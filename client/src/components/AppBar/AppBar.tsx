import React from 'react';
import './AppBar.css';
import { Toolbar, Typography, Box, Grid, Button, Switch, Theme, Link, ToggleButton, IconButton } from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { useNavigate } from 'react-router-dom';
import { useEditFormState } from '../../providers/formState';
import { FormDTO } from '../../types/form';
import theme from '../../styles/theme';
import Popover from '../common/Popover';
import { themeConstants } from '../../styles/theme.constants';
import { getPlural } from '../../utils/text.utils';
import {Check, Save} from '@mui/icons-material';
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
            <MuiAppBar position="relative" elevation={1} sx={{bgcolor: "white", zIndex: (theme) => theme.zIndex.drawer + 1 }} >
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
                                <ToggleButton
                                    value="check"
                                    color="success"
                                    selected={form?.visibility}
                                    onChange={handleChangeVisibility}
                                    sx={{mr: 2}}
                                >
                                    <Check />
                                </ToggleButton>
                                {form?.visibility && (
                                    <Link href={`http://localhost:3000/form/${form?.formId}`} target="_blank">
                                        <Typography variant='body2'>
                                        Lien du formulaire
                                        </Typography>
                                    </Link>
                                )}
                            </Box>
                            <Box sx={{display: 'flex', flexGrow: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Typography variant='h6' color={themeConstants.colors.mediumGrey}>
                                    {form?.title}
                                </Typography>
                            </Box>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                                <IconButton
                                    sx={{ mr: 2, maxWidth: 30, maxHeight: 30, borderRadius: 2, backgroundColor: themeConstants.colors.success, color: themeConstants.colors.white }}
                                    onClick={handleSave}
                                    children={<Save />}
                                />
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

