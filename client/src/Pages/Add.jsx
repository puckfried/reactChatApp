import React, {useState, useContext} from 'react'
import { Grid, Box, TextField, FormControl, Button } from '@mui/material'
import { UserContext } from '../context/user'
import { findUser, listFriends, sendAddFriend } from '../helpers/dbFunc'
import { SocketContext } from '../context/socket'
import Sidebar from '../Components/Sidebar';
import BackButton from '../Components/backButton'


export default function Add() {
    const [userInput, setUserInput] = useState('')
    const {user, setUser} = useContext(UserContext)
    const [friend, setFriend] = useState('')
    const [double, setDouble] = useState(false)
    const socket = useContext(SocketContext)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        setDouble(false)

        const handleSearch = async() => {
            const newFriend = await findUser(user._id, userInput)
            const oldFriends = await listFriends(user._id)
            if (!newFriend.error) {
                if (!oldFriends.error) {
                    const doubleExist = oldFriends.some(element => element.username === newFriend.username)
                    if (doubleExist) setDouble(true)}
                setFriend(newFriend)
            } else {
                console.log('ERROR :', newFriend)
            }
        }
        handleSearch()
        setUserInput('')
    }

    const handleAdd = (e) => {
        e.preventDefault()
        const addFriend = async() => {
            const addFriend = await sendAddFriend(user._id, friend._id)
            
        }
        addFriend()
        setFriend('')
        socket.emit('register','refresh')
    }

    return (
        <>
            <Sidebar />
            <Grid  margin="50px">
                <BackButton />
                <Box sx={{marginTop: '50px'}}>
                <h3>Add a socket friend</h3>
                <p>Search via Email or Username for your friend and add them to your List. So you can invite them for chatting!</p>
            
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
                <Button variant="contained" type="submit" onClick={(e) => handleSubmit(e)}>Search</Button>
            </Box>
            
            {friend && <Box>
                <h3>We found the following person:</h3>
                <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}> 
                    <h4>{friend.username}</h4> 
                    {double && friend ? <Button disabled>already your friend</Button> : 
                    <Button onClick={handleAdd} color='success'>+ add</Button> }
                </Box>
            </Box>}
            </Box>
        </Grid>
        </>
    )
}
