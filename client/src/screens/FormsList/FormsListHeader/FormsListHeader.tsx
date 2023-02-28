import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FormsListHeader.css';
import { Grid  } from '@mui/material';
import { Typography, Button } from '@mui/material';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useQuery } from '@apollo/client';
import { READ_USER } from '../../../services/user.query';

interface FormsListHeaderProps {};

//TODO get user form's data with Apollo Client


function FormsListHeader({}: FormsListHeaderProps) {
    const navigate = useNavigate();

    const handleLogOut = () => {
        localStorage.removeItem("token");
        navigate("/");
      };

    return (
        <>
            <Grid xs={3} className='dashboard-header-row1'>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid xs={1} className='dashboard-header-row1'>
                <Button
                    variant="contained"
                    onClick={() => null}
                    startIcon={<PersonAddAlt1Icon fontSize="large" />}
                />
            </Grid>          
            <Grid xs={8} className='' />
            <Grid xs={3} className='dashboard-header-row2'>
                <Button onClick={handleLogOut} variant='contained' >Se déconnecter</Button>
            </Grid>
            <Grid xs={6} />             
            <Grid xs={3} className='dashboard-header-row2'>
                <Typography variant="h5">Order by</Typography>
            </Grid>
        </>
    )
}

export default FormsListHeader;