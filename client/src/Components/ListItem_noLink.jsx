import React from 'react'
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';


export default function ListItem_noLink(user) {
    return (
        <ListItem 
            alignItems="center" 
            secondaryAction={
                <IconButton edge="end" aria-label="comments" style={{color: 'green'}}>
                    <CommentIcon />
                </IconButton>
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
