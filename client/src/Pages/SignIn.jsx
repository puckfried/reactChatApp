import React,{useState, useContext} from 'react'
import { Grid, Box, TextField, FormControl, Button, Alert } from '@mui/material'
import { addNewUser, authenticateUser } from '../helpers/dbFunc'
import { Redirect } from 'react-router'
import { UserContext } from '../context/user'


export default function SignIn() {
    
    const [username, setUsername]   = useState('')
    const [password, setPassword]   = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName]   = useState('')
    const [email, setEmail]         = useState('')
    
    const [error, setError]         = useState(null)
    const [done, setDone]           = useState(false)
    const {user, setUser, authIsDone, setAuthIsDone} = useContext(UserContext)


    const handleSubmit = async(e) => {
        e.preventDefault()
        const data = {username, password, firstName, lastName, email}
        const result = await addNewUser(data)    
        if (result.error){
            setError(result.error.message)
        } else {
            try {
                const login = await authenticateUser();
                console.log(login)
                if (!login.error) {
                  setUser(login);
                  setAuthIsDone(true);
                  console.log('SHould set auth to true', authIsDone)
                  return;
                }
      
              } catch (error) {
                  setError(error)
              }
        }
    } 
    return (
         <Grid item margin="50px">
            {user.username ? <Redirect to="/" /> : <></>}
            <h2>Login Page</h2>
            <p>Please give us your Data we collect and want to have more, please fill out all the fields as they are mandatory...</p>
            {error && <Alert severity="error">{error}</Alert>}
            <Box
                component="form"
                sx={{'& .MuiTextField-root': { m: 2, width: '25ch' },
                display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                noValidate={false}
                autoComplete="off"
            >
              <FormControl>
                <TextField
                    id="outlined-name"
                    label="Firstname"
                    value={firstName}
                    error={firstName === null}
                    required={true}
                    onChange={(e) => {setFirstName(e.target.value)}}
                /> 

                <TextField
                    id="outlined-name"
                    label="Lastname"
                    onChange={(e) => {setLastName(e.target.value)}}
                /> 

                <TextField
                    id="outlined-name"
                    label="Email"
                    type='email'
                    onChange={(e) => {setEmail(e.target.value)}}
                /> 

                <TextField
                    id="outlined-name"
                    label="Username"
                    onChange={(e) => {setUsername(e.target.value)}}
                /> 

                <TextField
                    id="outlined-pw-input"
                    label="Password"
                    type="password"
                    onChange={(e) => {setPassword(e.target.value)}}
                />  
            <Button type="submit" onClick={handleSubmit}>Proceed</Button>
            </FormControl>
            </Box>
        </Grid>
       
    )
}
