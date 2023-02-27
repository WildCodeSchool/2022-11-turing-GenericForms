import React from 'react';
import './FormsList.css';
import { Grid, IconButton, List, ListItem, ListItemText, Typography  } from '@mui/material';

const formsMock = [
    {
        id: 1,
        title: 'Formulaire 1',
        questions: 5,
        answers: 10,
        createdAt: '2021-10-10',
        lastUpdate: '2021-10-10',
        isActive: true
    },
    {
        id: 2,
        title: 'Formulaire 2',
        questions: 3,
        answers: 6,
        createdAt: '2021-10-10',
        lastUpdate: '2021-10-10',
        isActive: true
    },
    {
        id: 3,
        title: 'Formulaire 3',
        questions: 8,
        answers: 7,
        createdAt: '2021-10-10',
        lastUpdate: '2021-10-10',
        isActive: true
    },
]

interface FormsListProps {};

function FormsList({}: FormsListProps) {
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
                formsMock.map((form) => (
                    <React.Fragment key={form.id}>
                        <Grid item xs={2} className=''>
                            <IconButton></IconButton>
                        </Grid>
                        <Grid item xs={2} className=''>
                            <Typography variant="body1">{form.title}</Typography>
                        </Grid>
                        <Grid item xs={2} className=''>
                            <Typography variant="body1">{form.createdAt}</Typography>
                        </Grid>
                        <Grid item xs={1} className=''>
                            <Typography variant="body1">{form.questions}</Typography>
                        </Grid>
                        <Grid item xs={1} className=''>
                            <Typography variant="body1">{form.answers}</Typography>
                        </Grid>
                        <Grid item xs={2} className=''>
                            <Typography variant="body1">{form.lastUpdate}</Typography>
                        </Grid>
                        <Grid item xs={1} className=''>
                            <Typography variant="body1">{form.isActive}</Typography>
                        </Grid>
                        <Grid item xs={1} className=''>+</Grid>
                    </React.Fragment>
                ))
            }
            
                
        </>
    )
}

export default FormsList;