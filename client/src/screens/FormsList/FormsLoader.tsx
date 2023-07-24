import { Grid, Skeleton } from '@mui/material';
import React from 'react';

const FormsLoaderItem = () => {
    return (
        <Grid item xs={12} display="flex" justifyContent="center" sx={{margin: '1vh 0'}} >
            <Skeleton variant="rounded" animation="wave" width={'10%'} height={'8vh'} sx={{marginRight: '1vw'}} />
            <Skeleton variant="rectangular" animation="wave" width={'60%'} height={'8vh'} sx={{marginRight: '1vw'}} />
            <Skeleton variant="rounded" animation="wave" width={'30%'} height={'8vh'} />
        </Grid>
    )
    };

function FormsLoader({numItems = 5}) {
    const loadingItems: number[] = new Array(numItems).fill(0);
  return (
    <Grid container sx={{height: '100%', margin: '1vh 1vw'}} alignContent="center" alignItems="center" direction={'row'} >
        {loadingItems.map((item, index) => <FormsLoaderItem key={item + index} />)}
    </Grid>
  )
}

export default FormsLoader