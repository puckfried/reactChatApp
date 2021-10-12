import React, {useState, useContext} from 'react'
import { Grid, Box, TextField, FormControl, Button } from '@mui/material'
import { UserContext } from '../context/user'
import { findUser, listFriends, sendAddFriend } from '../helpers/dbFunc'


export default function Add() {
    const [userInput, setUserInput] = useState('')
    const {user, setUser} = useContext(UserContext)
    const [friend, setFriend] = useState('')
    const [double, setDouble] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setDouble(false)
        setUserInput('')

        const handleSearch = async() => {
            const newFriend = await findUser(user._id, userInput)
            const oldFriends = await listFriends(user._id)

            if (!newFriend.error && !oldFriends.error) {
                const doubleExist = oldFriends.some(element => element.username === newFriend.username)
                if (doubleExist) setDouble(true)
                console.log(newFriend, ' AND ', oldFriends)
                setFriend(newFriend)
            } else {
                console.log(newFriend)
            }
        }
        handleSearch()
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const addFriend = async() => {
            const addFriend = await sendAddFriend(user._id, friend._id)
            console.log(addFriend)
        }
        addFriend()
    }

    return (
        <div>
            <Grid item margin="50px">
            <h2>Add a socket</h2>
            <p>Search via Email or Username for your friend</p>
            <Box
                component="form"
                sx={{'& .MuiTextField-root': { m: 2, width: '25ch' },
                display: 'flex', flexDirection: 'row', alignItems: 'center'}}
                noValidate
                autoComplete="off"
            >
             
                 <TextField
                    id="outlined-name"
                    label="Username or Email"
                    onChange={(e) => {setUserInput(e.target.value)}}
                    value={userInput}
                    />
                <Button variant="contained" type="submit" onClick={(e) => handleSubmit(e)}>Proceed</Button>
            </Box>
            
            <Box>
                <h3>We found the following person:</h3>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}> 
                    <h4>{friend.username}</h4> 
                    {double && friend ? <Button disabled>already your friend</Button> : 
                    <Button onClick={handleAdd} color='success'>+ add</Button> }
                </Box>
            </Box>
        </Grid>
        </div>
    )
}
