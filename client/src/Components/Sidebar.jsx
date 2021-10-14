import { Box} from '@mui/system'
import Paper from '@mui/material/Paper';
import { SocketContext } from '../context/socket'
import { UserContext } from '../context/user';
import ListItemComponent from './ListItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PersonIcon from '@mui/icons-material/Person';

import React, {useContext, useEffect} from 'react'

import { searchOnlineFriends } from '../helpers/dbFunc';


export default function Sidebar() {
    const {user, friends, setFriends} = useContext(UserContext)
    const socket = useContext(SocketContext)


    const refreshFriends = async (data) => {
        const filterList = data.filter((element) => element !== socket.id)
        const friendsOnline = await searchOnlineFriends(user._id, filterList)
        setFriends(() => friendsOnline)
    }
    
    //Eventlistener on server signal, when fired -> refreshing the Friends List 
    useEffect(() => {
        socket.on('handshake',refreshFriends)
    }, [socket])    


    return (
      <Paper elevation={10} className='paper' sx={{height: '100%', minWidth: 250, background: '', flexShrink: 2,display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            <h4>Friends Online</h4>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {friends && friends.online.map((element, index) => {
                return(
                    <ListItemComponent key={index} user={element} index={index} ownId={socket.id}/>
                )
            })}
            <Divider variant="inset" component="li" />
            </List>
            <h4>FriendsOffline</h4>
            <List sx={{ width: '90%', bgcolor: 'background.paper', margin: '0 auto' }}>
            {friends && friends.offline.map((element, index) => {
                return(
                    <ListItem key={`List-${index}`}>
                        <ListItemAvatar key={`ListA-${index}`} >
                            <Avatar key={`Avatar_${index}`}>
                                <PersonIcon key={`icon_${index}`}/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={element.username}
                            key={`ListText_${index}`}
                        />
                    </ListItem>
                    )
            })}
            <Divider variant="inset" component="li" />
            </List>
        </Box>
</Paper>
    )
}
