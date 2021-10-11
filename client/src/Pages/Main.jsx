import React, {useEffect, useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { SocketContext } from '../context/socket'
import { UserContext } from '../context/user';
import { Button, Stack } from '@mui/material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material'
import ListItemComponent from '../Components/ListItem';

export default function Main() {
    const {user} = useContext(UserContext)
    const socket = useContext(SocketContext)
    const [activeUser, setActiveUser] = useState([])
    const [privateChat, setPrivateChat] = useState(false)
    const [privateVideo, setPrivateVideo] = useState(false)
    
    const [privateRequest, setPrivateRequest] = useState('')

    const handleShake = data => {
        const filterList = data.filter((element) => element !== socket.id)
        setActiveUser(() => filterList)
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
        socket.emit('register', user)
    },[])


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
            <p>Other Socks online:</p>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {activeUser.map((element, index) => {
                    return( 
                            <>
                                <ListItemComponent user={element} index={index} ownId={socket.id}/>
                                <Divider variant="inset" component="li" />
                            </>
                    )
                })}
            </List>
            
            <Stack direction="row" spacing={2}>
            <Link to={{
                            pathname: `/chat/`,
                            state: {type: 'groupChat', to: 'group'}
                        }} style={{textDecoration: 'none'}}>
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
