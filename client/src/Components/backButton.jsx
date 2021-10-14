import React from 'react'
import { Redirect } from 'react-router'
import { useState } from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Box } from '@mui/system';
import { Paper } from '@mui/material';

export default function BackButton(props) {
    
   const {stopVideo} = props

    const [onClose, setOnClose] = useState(false)
    const [elevation, setElevation] = useState(6)

    const handleOnClick = () => {
        if (stopVideo) stopVideo();
        setOnClose(true)
    }
    
    return (
      <>
      <Paper elevation={elevation} className='paper' sx={{width: '110px', borderRadius: '20px'}} >
            <Box sx={{
                    width: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    backgroundColor: '#C3E0E5',
                    padding: '5px',
                    borderRadius: '20px',
                    color: '#274472',
                    fontWeight: '600',
                    cursor: 'pointer',
                    '&:hover': {
                        backgroundColor: '#274472',
                        opacity: [0.9, 0.8, 0.7],
                        color: '#C3E0E5'
                      }}}
                    onClick={handleOnClick}
                    onMouseEnter={() => setElevation(3)}
                    onMouseLeave={() => setElevation(6)}
                    >
                <KeyboardBackspaceIcon /> 
                <span> BACK</span>
            </Box>
            {onClose && <Redirect to='/' />}
        </Paper>
        </>
    )
}
