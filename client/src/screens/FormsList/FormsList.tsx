import React from 'react';
import './FormsList.css';
import { Grid, List, ListItem, ListItemText, Typography  } from '@mui/material';
import { useQuery } from '@apollo/client';
import { READ_FORMS } from '../../services/forms.query';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// const formsMock = [
//     {
//         id: 1,
//         title: 'Formulaire 1',
//         questions: 5,
//         answers: 10,
//         createdAt: '2021-10-10',
//         lastUpdate: '2021-10-10',
//         isActive: true
//     },
//     {
//         id: 2,
//         title: 'Formulaire 2',
//         questions: 3,
//         answers: 6,
//         createdAt: '2021-10-10',
//         lastUpdate: '2021-10-10',
//         isActive: true
//     },
//     {
//         id: 3,
//         title: 'Formulaire 3',
//         questions: 8,
//         answers: 7,
//         createdAt: '2021-10-10',
//         lastUpdate: '2021-10-10',
//         isActive: true
//     },
// ]

interface FormsListProps {};

function FormsList({}: FormsListProps) {

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
            <Grid item xs={12} className=''>
                <Typography variant="h5">
                    Liste de vos formulaires
                </Typography>
            </Grid>
            <Grid item xs={6} className='' />
            <Grid item xs={1} className=''>
                <Typography variant="body1">Questions</Typography>
            </Grid>
            <Grid item xs={1} className=''>
                <Typography variant="body1">Réponses</Typography>
            </Grid>
            <Grid item xs={2} className=''>
                <Typography variant="body1">Modifié le</Typography>
            </Grid>
            <Grid item xs={1} className=''>
                <Typography variant="body1">Actif</Typography>
            </Grid>
            <Grid item xs={1} className='' />
            {
                formsData?.readForms.map((form) => (
                    <Grid container key={form.formId} className='forms-list-container'>
                        <Grid item xs={2} className=''>
                            <LocalPostOfficeIcon fontSize='large' color='secondary'/>
                        </Grid>
                        <Grid item xs={2} className=''>
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