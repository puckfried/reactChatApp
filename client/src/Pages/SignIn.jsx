import React,{useState} from 'react'
import { Grid, Box, TextField, FormControl, Button } from '@mui/material'


export default function SignIn() {
    
    const [userInput, setUserInput] = useState(null)
    const handleSubmit = (e) => {
        e.preventDefault()
    } 
    
    return (
         <Grid item margin="50px">
            <h2>Login Page</h2>
            <p>Please login to use our service. If you have no account yet, visit our SignUp Page or follow the Link fom your invitation mail.</p>
            <Box
                component="form"
                sx={{'& .MuiTextField-root': { m: 2, width: '25ch' },
                display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                noValidate
                autoComplete="off"
            >
              <FormControl>
                <TextField
                    id="outlined-name"
                    label="Firstname"
                    onChange={(e) => {setUserInput(e.target.value)}}
                /> 

                <TextField
                    id="outlined-name"
                    label="Lastname"
                    onChange={(e) => {setUserInput(e.target.value)}}
                /> 

                <TextField
                    id="outlined-name"
                    label="Email"
                    onChange={(e) => {setUserInput(e.target.value)}}
                /> 

                <TextField
                    id="outlined-name"
                    label="Username"
                    onChange={(e) => {setUserInput(e.target.value)}}
                /> 

                <TextField
                    id="outlined-pw-input"
                    label="Password"
                    type="password"
                    onChange={(e) => {setUserInput(e.target.value)}}
                />  
            <Button type="submit" onClick={handleSubmit}>Proceed</Button>
            </FormControl>
            </Box>
        </Grid>
       
    )
}
