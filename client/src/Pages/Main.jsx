import React, {useEffect, useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { SocketContext } from '../context/socket'
import { UserContext } from '../context/user';
import { Button, Stack } from '@mui/material';
import { Grid } from '@mui/material'
import { registerUserDb, searchOnlineFriends } from '../helpers/dbFunc';

export default function Main() {
    const {user, socketId, setSocketId, friends, setFriends} = useContext(UserContext)
    const socket = useContext(SocketContext)
    const [activeUser, setActiveUser] = useState([])
    const [privateChat, setPrivateChat] = useState(false)
    const [privateVideo, setPrivateVideo] = useState(false)
    
    const [privateRequest, setPrivateRequest] = useState('')

    const handleShake = async (data) => {
        const filterList = data.filter((element) => element !== socket.id)
        const friendsOnline = await searchOnlineFriends(user._id, filterList)
        setFriends(() => friendsOnline)
    }

    const handleprivatRequest = (data) => {
        setPrivateChat(true)
        setPrivateRequest(data)
        console.log('Hey there is a private request!!!', data)
    }

    const handleVideoRequest = (data) => {
        setPrivateVideo(true)
        setPrivateRequest(data)
        console.log('Hey there is a Video request!!!', data)
    }

    useEffect(() =>  {
        const database = async() => {
            const result = await registerUserDb(user._id, socket.id)
            console.log(result, ' this went into database!!')
            if (!result.error){
                socket.emit('register', 'wait')}
            return
            }
        if (socket.id) database()
    },[socket.id])


    useEffect(() => {
        socket.on('handshake', handleShake)
        socket.on('chatRequest', handleprivatRequest)
        socket.on('videoRequest', handleVideoRequest)
        return () => {
            socket.off('handshake', handleShake)
            socket.off('privaeRequest', handleprivatRequest)
        }
    }, [socket])
    
    
    return (
        <Grid item margin="50px" >
            <h3>Welcome back {user.username}</h3>
            
            <Stack direction="row" spacing={2}>
            <Link to={{
                        pathname: `/chat/`,
                        state: {type: 'groupChat', to: 'group'}
                        }} 
                        style={{textDecoration: 'none'}}>
                <Button variant="contained" sx={{backgroundColor: '#5885AF', margin: '30px'}}>Group Chat</Button></Link>
            
            {privateChat ? 
                <Link to={{
                    pathname: `/chat/`,
                    state: {type: 'acceptPrivateRequest', to: privateRequest}
                    }} style={{textDecoration: 'none'}}>
                    <Button variant="contained"  sx={{backgroundColor: '#5885AF', margin: '30px'}} color="success">Accept Private Invitation</Button></Link> : <></> }
            
            {privateVideo ? 
                <Link to={{
                    pathname: `/peer/`,
                    state: {id: socket.id, friend: privateRequest }
                    }} style={{textDecoration: 'none'}}>
                    <Button variant="contained"  sx={{backgroundColor: '#5885AF', margin: '30px'}} color="success">Accept Private Invitation</Button></Link> : <></> }

            
            </Stack>
        </Grid>
    )
}
