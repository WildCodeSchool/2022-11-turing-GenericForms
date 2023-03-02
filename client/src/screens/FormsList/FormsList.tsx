import React from 'react';
import './FormsList.css';
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

function FormsList({}: FormsListProps) {

    const classes = useStyles();

    //TODO get user form's data with Apollo Client

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
            <Grid container className='dashboard-header-row2' >
                <Grid item xs={9} >
                    <Button variant='contained'>
                        + Créer un formulaire
                    </Button>
                </Grid>
                <Grid item xs={3} >
                    <Typography variant="h5">Order by</Typography>
                </Grid>
            </Grid>
            <Grid container className='dashboard-header-row3' >
                <Grid item xs={6} />
                <Grid item xs={1} className=''>
                    <Typography variant="label" >Questions</Typography>
                </Grid>
                <Grid item xs={1} className=''>
                    <Typography variant="label" >Réponses</Typography>
                </Grid>
                <Grid item xs={2} className=''>
                    <Typography variant="label"  >Modifié le</Typography>
                </Grid>
                <Grid item xs={1} className=''>
                    <Typography variant="label" >Actif</Typography>
                </Grid>
                <Grid item xs={1} className='' />
            </Grid>
            
            {
                formsData?.readForms.map((form) => (
                    <Grid container key={form.formId} className='forms-list-container'>
                        <Grid item xs={2} className=''>
                            <LocalPostOfficeIcon fontSize='large' color='secondary'/>
                        </Grid>
                        <Grid item xs={2} className={classes.title}>
                            <Typography variant="body1">{form.title}</Typography>
                        </Grid>
                        <Grid item xs={2} className=''>
                            <Typography variant="body1">{form.category}</Typography>
                        </Grid>
                        <Grid item xs={1} className=''>
                            <Typography variant="body1">55</Typography>
                        </Grid>
                        <Grid item xs={1} className=''>
                            <Typography variant="body1">55</Typography>
                        </Grid>
                        <Grid item xs={2} className=''>
                            <Typography variant="body1">{form.themeId}</Typography>
                        </Grid>
                        <Grid item xs={1} className=''>
                            <Typography variant="body1">Oui</Typography>
                        </Grid>
                        <Grid item xs={1} className=''>
                        <MoreVertIcon fontSize='large' color='disabled' />
                        </Grid>
                    </Grid>
                ))
            }
            
                
        </>
    )
}

export default FormsList;