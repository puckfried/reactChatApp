import React, {useEffect, useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { SocketContext } from '../context/socket'
import { UserContext } from '../context/user';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import { Grid } from '@mui/material'
import SendIcon from '@mui/icons-material/Send';
import BackButton from '../Components/backButton';
import { Box } from '@mui/system';




export default function Chat({location}) {
    const {user} = useContext(UserContext)
    const socket = useContext(SocketContext);

    const {state} = location   
    const {type, to} = state

    const [input, setInput] = useState('')
    const [msgHistory, setMsgHistory] = useState([])
    const [privateRoom, setPrivateRoom] = useState(null)
    const [friend, setFriend] = useState(null)

    //sending Messages depending if private or group
    const sendMsg = () => {
        const string = {msg: `${user.username}: ${input}`, user: user.username}
        const tmpArray = [...msgHistory, string]  
        setMsgHistory(() => tmpArray)
        if (type=== 'groupChat'){
            socket.emit('groupMsg', string);
        }
        if (privateRoom){
            const data = {
                header: privateRoom,
                payload: string
            }
            socket.emit('privateMsg', data);
        }
          setInput('')
      }

    //Income Messages will be added to the history and displayed
      const handleIncomeMsg = (data) => {
        setMsgHistory((prevState) => [...prevState, data])
        console.log(data, user.userName)
    }


    //after finishing handshake setting privateRoom
    const handlePrivateHandshake = (data) => {
        setPrivateRoom(data)
        console.log('PrivateRoom is setted', data)

    }

    //Manage the private Chat registration 
    useEffect( () => {
        if (type === 'requestPrivatChat'){
            console.log('Private chat requested')
            socket.emit('private', {theOther: to, type: 'chatRequest'})
            setFriend(to)
        }

        if (type === 'acceptPrivateRequest'){
            const room = `private-${to}`
            socket.emit('joinPrivate', room)
            setFriend(to)
            setPrivateRoom(room)
        } 
    },[])


    // telling server this socket is now in group chat
    useEffect(() =>  {
        if (type === 'groupChat') socket.emit('newGroup', [ user])
    },[socket])


    //Starting listeners for incoming Messaged
    useEffect(() => {
        socket.on('groupMsg', handleIncomeMsg)
        socket.on('privateHandshake', handlePrivateHandshake)
        socket.on('privateMsg', (data) => handleIncomeMsg(data.payload))
       
    },[socket])

    
    return (
        <Grid item margin='50px' sx={{width: "100%"}}>
            {/* Private ROOM must be be closed here */}
            <BackButton />
            <Link to={{pathname: `/`}}  style={{textDecoration: 'none'}}>
                <p>BACK...</p>
            </Link>
           {!privateRoom && type!=='groupChat' ?
           
           <>
            <h3>Waiting for your socket friend... A spinner would be nice!</h3>
           </>
           :
           <>
           <Box className='chatWrapper' sx={{maxWidth: '800px', margin: '0 auto', textAlign: 'center'}}>
           
           {type === 'groupChat' ? <h3>Group Chat</h3> :
           <h3>Private Chat with {friend}</h3>
           }
           
           {msgHistory ? msgHistory.map((element, index) => {
                return(
                        <>
                        {element.user === user.username ?
                           <div className='bubble left'><p className='chatMsg'>{element.msg}</p></div> :
                           <div className='bubble right'><p className='chatMsg right'>{element.msg}</p></div>
                        }  
                        </>
                        )

                    })
                : <></>}
           

           <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
            <InputBase
                sx={{ ml: 1, flex: 1, marginTop: '50px' }}
                placeholder="Your message"
                inputProps={{ 'aria-label': 'search google maps' }}
                value={input} 
                onChange={(e) => setInput(e.target.value) }
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton onClick={sendMsg} color="primary" sx={{ p: '10px' }} aria-label="directions">
                <SendIcon />
            </IconButton>
         
           </Paper>
           </Box>
           </>
            }
        </Grid>
    )
}
