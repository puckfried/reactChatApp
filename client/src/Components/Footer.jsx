import React from 'react'
import { Grid } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import BuildOutlinedIcon from '@mui/icons-material/BuildOutlined';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';


export default function Footer() {
   
   
    return (
        <Grid item height="100px"  sx={{color: '#C3E0E5', position: 'relative', bottom: '0', padding: '20px', backgroundColor: '#274472', display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: "100vw"}}>
         <Link to="/add/" >
                 <IconButton>
                    <PersonAddIcon  className='iconScale' sx={{color: '#C3E0E5' }}fontSize='large'/>
                </IconButton>
            </Link>


       
        
        <IconButton>
            <ChatOutlinedIcon className='iconScale' sx={{color: '#C3E0E5' }}fontSize='large'/>
        </IconButton>
        <IconButton>
            <BuildOutlinedIcon className='iconRotate' sx={{color: '#C3E0E5' }}fontSize='large' />
        </IconButton>

        </Grid>
    )
}
