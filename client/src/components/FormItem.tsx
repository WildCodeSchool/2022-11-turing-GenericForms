import React from 'react';
import { Grid, IconButton, Theme, Tooltip, Typography, Card } from '@mui/material';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import {ModeEdit, ViewWeek} from '@mui/icons-material';
import theme from '../styles/theme';
import { useNavigate } from 'react-router-dom';
import { FormDTO } from '../types/form';
import { themeConstants } from '../styles/theme.constants';

interface FormItemProps {
    form: FormDTO;
}

const useCss = (theme: Theme) => ({
    formsListContainer: {
        width: '100%',
        display: 'flex' ,
        alignItems: 'center',

        border: themeConstants.border.base,
        height: '8vh',
        margin: '1vh 1vw',
    },
    centerTxt: {
        textAlign: 'center',
    },
    title : {
        color: theme.palette.custom.main,
    }
});


const FormItem = ({form}: FormItemProps) => {
    const css = useCss(theme);
    const navigate = useNavigate();

    const handleClick = () => {
        console.log(form);
        navigate(`/edit/${form.formId}`);
    };

    return (
        <Card sx={css.formsListContainer} >
            <Grid item xs={1} display="flex" justifyContent="center">
                <ViewWeek fontSize='large' color='action'/>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="body1" sx={[css.centerTxt]}>{form.title}</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="body1" sx={css.centerTxt}>{form.category}</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="body1" sx={css.centerTxt}>{form.questions.length}</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="body1" sx={css.centerTxt}>55</Typography>
            </Grid>
            <Grid item xs={2}>
                <Typography variant="body1" sx={css.centerTxt}>{form.themeId}</Typography>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="body1" sx={css.centerTxt}>{form.visibility ? 'Oui': 'Non'}</Typography>
            </Grid>
            <Grid item xs={1} display="flex" justifyContent="center">
                <Tooltip title="Modifier" placement="top">
                    <IconButton onClick={handleClick}>
                        <ModeEdit fontSize='medium' color='primary' />
                    </IconButton>
                </Tooltip>
            </Grid>
        </Card>
    )
};

export default FormItem;