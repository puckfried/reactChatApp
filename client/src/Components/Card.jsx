import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';


export default function CardComponent({user}) {
    return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {user}
        </Typography>
       </CardContent>
      <CardActions>
        <Link to={{pathname: `/chat/`,
                   state: {type: 'requestPrivatChat', to: user }
                   }}>
            <IconButton edge="end" aria-label="comments" style={{color: 'green'}}>
                <CommentIcon />
            </IconButton>
        </Link>
        <Button size="small">Video</Button>
      </CardActions>
    </Card>
    )
}

