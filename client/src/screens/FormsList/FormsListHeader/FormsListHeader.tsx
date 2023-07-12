import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FormsListHeader.css';
import { Grid  } from '@mui/material';
import { Typography, Button } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

function FormsListHeader() {

    return (
        <>
            <Grid item xs={2} className='dashboard-header-row1'>
                <Typography variant="h5" sx={{}} >Dashboard</Typography>
            </Grid>
            <Grid item xs={1} className='dashboard-header-row1'>
                <Button
                    variant="contained"
                    onClick={() => null}
                    startIcon={<PersonAddAlt1Icon fontSize="small" />}
                    sx={{minWidth: 10, minHeight: 10 }}
                />
            </Grid>          
            <Grid item xs={9} className='' />
        </>
    )
}

export default FormsListHeader;