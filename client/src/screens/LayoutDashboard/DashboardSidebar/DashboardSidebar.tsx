import React from 'react';
import './DasboardSidebar.css';
import { Typography, List, ListItem, ListItemText, Box, Container, Grid } from '@mui/material';


interface DashboardSidebarProps {}

const DashboardSidebar = ({}: DashboardSidebarProps) => {

    return (
        <Grid item xs={2} className='sidebar-container'>
            <Typography variant="h5">
                Notes
            </Typography>
            <List>
                <ListItem 
                    key={'5'} 
                    onClick={() => null}
                >
                    <ListItemText primary={"option 1"} />
                </ListItem>
            </List>
        </Grid> 
    )


    // return (
    //     <MuiDrawer
    //         anchor='left'
    //         variant='permanent'
    //     >
    //         <Box>
    //             <Typography variant="h5">
    //             Ninja Notes
    //             </Typography>
    //         </Box>
    //             <List>
    //             <ListItem 
    //                 key={'5'} 
    //                 onClick={() => null}
    //             >
    //                 <ListItemText primary={"option 1"} />
    //             </ListItem>
    //         </List>
    //     </MuiDrawer>
    // )
}

export default DashboardSidebar;

