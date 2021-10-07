import React, { useRef, useEffect, useState, useContext } from 'react'
import { SocketContext } from '../context/socket'
import Peer from 'peerjs'
import { Link, Redirect } from 'react-router-dom';
import  Button  from '@mui/material/Button';


export default function PeerView({location}) {
    const socket = useContext(SocketContext)
    const peer = useRef(null)
    const {state} = location  
    const {id, friend, type} = state
    

    const [connected, setConnected] = useState(false)
    const connectionRef = useRef(null)
    const videoRef = useRef(null)
    const ownVideo = useRef(null)
    const callRef = useRef(null)

  
    const stopVideo = () => {
        try{
            console.log('STOP VIDEO ')
            ownVideo.current.srcObject.getTracks().forEach(track => {
                console.log('STOP TRACK: ', track)
                track.stop();
              });
            videoRef.current.srcObject.getTracks().forEach(track => {
              console.log('STOP TRACK: ', track)
              track.stop();
            });
            callRef.current.close()
            console.log('THE CALLREF IS CLOSED? ',callRef.current)
        }
        catch(error){
            console.log('Could not delete tracks, no video started', error)
        }
        peer.current.destroy()
     }

    const startVideo = async() => {
        try {
            if (!videoRef.current.srcObject){
                console.log('VIDEO CAN START')
                const stream = await navigator.mediaDevices.getUserMedia({audi: false, video: true, })
                console.log('STREAM: ',stream, 'PEER who wants Video: ', peer.current)
                ownVideo.current.srcObject = stream
                callRef.current = peer.current.call(friend, stream);
                callRef.current.on('stream', async (remoteStream) => {
                    videoRef.current.srcObject = remoteStream
                })
            }
            else {
                console.log('Stop Video TRACKS')
                stopVideo()
            }
    
        }
        catch(error) {
            console.log('ERROR: Can not start video ',error)
        }
       }


//Initialising the peer 
    useEffect(() => {
        if (type==='requestVideo'){
            socket.emit('private', {theOther: friend, type: 'videoRequest'})}
        
        peer.current= new Peer(id, {
            host: 'localhost',
            port: 5000,
            path: '/peerjs/myapp',
            config: {'iceServers': [
                {url: 'stun:stun.l.google.com:19302'}
            ]}
        })
        //PEERJS Error handler
        peer.current.on('error', function(error){
            console.log('EEEERRRRRORRRRR: ', error)
        })

        //Try to connect to other
        connectionRef.current = peer.current.connect(friend)
        console.log('TRY to connect to other peer ', connectionRef.current)
        connectionRef.current.on('open', function(){
            console.log('connected with data connection')
            setConnected(true)
            // startVideo()
        })

},[])


//Event Listener for incoming peer requests
    useEffect(() => {
        peer.current.on('call', async (call) => {
            callRef.current = call
            setConnected(true)
            const stream = await navigator.mediaDevices.getUserMedia({audi: false, video: true, })
            ownVideo.current.srcObject = stream
            callRef.current.answer(stream)
            callRef.current.on('stream', (remoteStream) => {
                videoRef.current.srcObject = remoteStream
            })
        })
    },[])

    const handleCanPlay = () => {
        videoRef.current.play()
       }

    return (
        <div>
             <h1>VideoChat with {friend}</h1>
             <Link to={{pathname: `/`}}  style={{textDecoration: 'none'}} onClick={stopVideo}>
                <p>BACK...</p>
            </Link>
             {!connected && <h3>Please wait for your video peer... Again a spinner would be great!</h3>}   
        
            <Button onClick={startVideo} variant="contained"  sx={{backgroundColor: '#5885AF', margin: '30px'}} color="success">Start Video</Button>
            <video style={{transform: "scaleX(-1)", height: '300px', width: '300px'}} ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
            <video style={{display: 'none'}} ref={ownVideo} />
        </div>
    )
}
