import React from "react";
import { Grid, Typography } from "@mui/material";

export default function Footer() {


  return (
    <Grid container spacing={2} sx={{ bgColor: 'primary' }}>
      <Grid item xs={12} >
        <Typography>&copy; 2023 Generic Forms</Typography>
      </Grid>
    </Grid>
  );
}
