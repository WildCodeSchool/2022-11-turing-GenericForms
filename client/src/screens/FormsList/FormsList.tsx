import React from 'react';
import { Button, Grid, Typography  } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useQuery } from '@apollo/client';
import { READ_FORMS } from '../../services/forms.query';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styles } from './FormsListStyles';

declare module "@mui/material/Typography" {
    interface TypographyPropsVariantOverrides{
      label: true;
    }
}

interface FormsListProps {};

const useStyles = makeStyles(styles);

const css = {
    formsListContainer: {
        border: '1px solid #000000',
        height: '8vh',
        margin: '1vh 1vw',
    },
    centerTxt: {
        textAlign: 'center',
    },
    row2: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: '4vw',
        height: '10vh',
    },
    row3: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        height: '5vh',
    },
    formsRow:{
        justifyContent: 'center',
    }
};

function FormsList({}: FormsListProps) {
    const classes = useStyles();

    const {data: formsData, loading, error, refetch} = useQuery<ReadFormsDTO>(READ_FORMS, {
        //authorization token in header set automatically ? 
        onCompleted(data: ReadFormsDTO) {
            console.log(data);
        },
        onError(error) {
            console.log(error);
        }
    });

    return (
        <>
            <Grid container sx={css.row2} >
                <Grid item xs={9} >
                    <Button variant='contained'>
                        + Créer un formulaire
                    </Button>
                </Grid>
                <Grid item xs={3} >
                    <Typography variant="h5">Order by</Typography>
                </Grid>
            </Grid>
            <Grid container sx={css.row3} >
                <Grid item xs={6} />
                <Grid item xs={1} >
                    <Typography variant="label" component={'p'} sx={css.centerTxt} >Questions</Typography>
                </Grid>
                <Grid item xs={1} >
                    <Typography variant="label" component={'p'} sx={css.centerTxt} >Réponses</Typography>
                </Grid>
                <Grid item xs={2} >
                    <Typography variant="label" component={'p'} sx={css.centerTxt} >Modifié le</Typography>
                </Grid>
                <Grid item xs={1} >
                    <Typography variant="label" component={'p'} sx={css.centerTxt} >Actif</Typography>
                </Grid>
                <Grid item xs={1}  />
            </Grid>
            
            {
                formsData?.readForms.map((form) => (
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
                ))
            }
            
                
        </>
    )
}

export default FormsList;