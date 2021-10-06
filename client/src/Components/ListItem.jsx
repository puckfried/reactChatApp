import React from 'react'
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront';

export default function ListItemComponent({user, index, ownId}) {
    console.log('To ', user, ' from ', ownId)
    return (
        <ListItem 
        alignItems="center" 
        key={index}
        secondaryAction={
            <>
            <Link to={{
                pathname: `/chat/`,
                state: {type: 'requestPrivatChat', to: user }
                }}
                 >
                <IconButton edge="end" aria-label="comments" style={{color: 'green'}}>
                    <CommentIcon />
                </IconButton>
            </Link>
             <Link to={{
                pathname: `/peer/`,
                state: {id: ownId, friend: user }
                }}
                 >
                <IconButton edge="end" aria-label="comments" style={{color: 'red'}}>
                    <VideoCameraFrontIcon />
                </IconButton>
            </Link>
            </>
          }
          disablePadding    
        >
        <ListItemAvatar>
            <Avatar alt="random Avatar" src="https://source.unsplash.com/200x200/?person" />
        </ListItemAvatar>
        <ListItemText
            primary={user}
        />
    </ListItem>
    )
}
