import { Box} from '@mui/system'
import Paper from '@mui/material/Paper';
import { SocketContext } from '../context/socket'
import { UserContext } from '../context/user';
import ListItemComponent from './ListItem';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';

import CommentIcon from '@mui/icons-material/Comment';
import ListItem from '@mui/material/ListItem';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import PersonIcon from '@mui/icons-material/Person';

import React, {useState, useContext} from 'react'
import ListItem_noLink from './ListItem_noLink';

export default function Sidebar() {
    const [friendsOnline, setFriendsOnline] = useState(null)
    const socket = useContext(SocketContext)
    const {user, friends, setFriends} = useContext(UserContext)


    return (
      <Paper elevation={10} className='paper' sx={{height: '100%', width: 300, background: '', flexShrink: 3,display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
            <h4>Friends Online</h4>
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {friends.online && friends.online.map((element, index) => {
                return(
                    <ListItemComponent user={element} index={index} ownId={socket.id}/>
                )
            })}
            <Divider variant="inset" component="li" />
            </List>
            <h4>FriendsOffline</h4>
            <List sx={{ width: '90%', bgcolor: 'background.paper', margin: '0 auto' }}>
            {friends.offline && friends.offline.map((element, index) => {
                return(
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <PersonIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={element.username}
                            
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
