import React from 'react';
import { makeStyles } from '@mui/styles';
import { Grid, Theme, Typography  } from '@mui/material';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {styles} from './FormItem.style';
import theme from '../styles/theme';

interface FormItemProps {
    form: FormDTO;
};

const useStyles = makeStyles(styles);

const useCss = (theme: Theme) => ({
    formsListContainer: {
        border: '1px solid #000000',
        height: '8vh',
        margin: '1vh 1vw',
    },
    centerTxt: {
        textAlign: 'center',
    },
});


const FormItem = ({form}: FormItemProps) => {
    const classes = useStyles();
    const css = useCss(theme);

    return (
        <Grid container key={form.formId} sx={css.formsListContainer} alignContent="center" alignItems="center" >
                        <Grid item xs={2} display="flex" justifyContent="center">
                            <LocalPostOfficeIcon fontSize='large' color='secondary'/>
                        </Grid>
                        <Grid item xs={2} className={classes.title}>
                            <Typography variant="body1" sx={css.centerTxt}>{form.title}</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" sx={css.centerTxt}>{form.category}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant="body1" sx={css.centerTxt}>55</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant="body1" sx={css.centerTxt}>55</Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <Typography variant="body1" sx={css.centerTxt}>{form.themeId}</Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography variant="body1" sx={css.centerTxt}>Oui</Typography>
                        </Grid>
                        <Grid item xs={1} display="flex" justifyContent="center">
                            <MoreVertIcon fontSize='large' color='disabled' />
                        </Grid>
                    </Grid>
    )
};

export default FormItem;