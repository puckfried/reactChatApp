import React from 'react'
import { Grid } from '@mui/material'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';

export default function Header() {
    return (
        <Grid item height="100px"  sx={{padding: '20px', color: 'white', backgroundColor: '#274472', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: "100vw"}}>
         <h3>LOGO</h3> 
         <h2>Socket Friends</h2>
         <PersonOutlineIcon /> 
        </Grid>
    )
}
