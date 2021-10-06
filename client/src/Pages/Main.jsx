import React, {useEffect, useContext, useState, useCallback} from 'react'
import { Link } from 'react-router-dom';
import { SocketContext } from '../context/socket'
import { UserContext } from '../context/user';
import { Button, Stack } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { Grid } from '@mui/material'
import ListItemComponent from '../Components/ListItem';

export default function Main() {
    const {user} = useContext(UserContext)
    const socket = useContext(SocketContext)
    const [activeUser, setActiveUser] = useState([])
    const [privateChat, setPrivateChat] = useState(false)
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

    useEffect(() =>  {
        socket.emit('register', user)
        console.log('This is the registration hook', socket)
    },[])


    useEffect(() => {
        socket.on('handshake', handleShake)
        socket.on('privatRequest', handleprivatRequest)
        return () => {
            socket.off('handshake', handleShake)
            socket.off('privaeRequest', handleprivatRequest)
        }
    }, [socket])
    
    
    return (
        <Grid item margin="50px" >
            <h3>Welcome back {socket.id}</h3>
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
            </Stack>
        </Grid>
    )
}
