import React, {useState, useContext} from 'react'
import { Grid, Box, TextField, FormControl, Button } from '@mui/material'
import { UserContext } from '../context/user'
import {loginUser} from '../helpers/dbFunc.js'
import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Login() {
    
    const [userInput, setUserInput] = useState('')
    const [pwInput, setPwInput] = useState('')
    const {user, setUser} = useContext(UserContext)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        const handleLogin = async() => {
            const data = await loginUser(userInput, pwInput)
            setUser(data)
        }
        handleLogin()
    }

    console.log(user.username, ' WHY DO YOU NOT DO ANYTHING???')
    return (
        <>
        {user.username ? <Redirect to="/" /> :
        
        <Grid item margin="50px">
            <h2>Login Page</h2>
            <p>Please login to use our service. If you have no account yet, visit our <Link to='/signup' style={{color: 'blue', textDecoration: 'underline'}}>SignUp Page</Link> or follow the Link of your invitation mail. You have no invitation, probably you have no friends.</p>
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
                    label="Username"
                    onChange={(e) => {setUserInput(e.target.value)}}
                    /> 

                <TextField
                id="outlined-pw-input"
                label="Password"
                type="password"
                onChange={(e) => {setPwInput(e.target.value)}}
                />  
            <Button type="submit" onClick={handleSubmit}>Proceed</Button>
            </FormControl>
            </Box>
        
        </Grid>
    }
    </>
    )
}

export default Login
