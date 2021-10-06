import React, { useRef, useEffect, useState } from 'react'
import Peer from 'peerjs'
import { Link } from 'react-router-dom';

import  Button  from '@mui/material/Button';


export default function PeerView({location}) {
    const peer = useRef(null)
    const {state} = location  
    const {id, friend} = state

    const [connected, setConnected] = useState(false)
    const connectionRef = useRef(null)
    const videoRef = useRef(null)
    const ownVideo = useRef(null)

    const stopVideo = () => {
        console.log('STOP VIDEO ')
        ownVideo.current.srcObject.getTracks().forEach(track => {
            console.log('STOP TRACK: ', track)
            track.stop();
          });
        videoRef.current.srcObject.getTracks().forEach(track => {
          console.log('STOP TRACK: ', track)
          track.stop();
        });
    }

    const startVideo = async() => {
        try {
            if (!videoRef.current.srcObject){
                console.log('VIDEO CAN START')
                const stream = await navigator.mediaDevices.getUserMedia({audi: false, video: true, })
                ownVideo.current.srcObject = stream
                let call = peer.current.call(friend, stream);
                call.on('stream', async (remoteStream) => {
                    videoRef.current.srcObject = remoteStream
                })
            }
            else {
                console.log('Stop Video TRACKS')
                stopVideo()
            }
    
        }
        catch(error) {
            console.log('Something is wrong: ',error)
        }
       }


//Initialising the peer 
    useEffect(() => {
        peer.current= new Peer(id, {
            host: 'localhost',
            port: 5000,
            path: '/peerjs/myapp',
            config: {'iceServers': [
                {url: 'stun:stun.l.google.com:19302'}
            ]}
        })
    },[])


//Event Listener for incoming peer requests
    useEffect(() => {
        // connectionRef.current = peer.current.connect(friend)
        
        peer.current.on('connection', function(conn){
            console.log('connected!!')
            setConnected(true)
            startVideo()
            connectionRef.current = conn
           
            //NOT NEEDED ONLY FOR DATA CONNECTION
            // connectionRef.current.on('open', () => {
                // console.log('CONNECTIONREF on On fired')
                // connectionRef.current.on('data', (data) => {
                //     console.log('DATA ARRIVED')
                //     })
            // })
        })

        peer.current.on('call', async (call) => {
            setConnected(true)
            const stream = await navigator.mediaDevices.getUserMedia({audi: false, video: true, })
            ownVideo.current.srcObject = stream
            call.answer(stream)
            call.on('stream', (remoteStream) => {
                videoRef.current.srcObject = remoteStream
            })
        })
    },[])


    // const connect = () => {
    //     connectionRef.current = peer.current.connect(friend)
    //     connectionRef.current.on('open', () => {
    //          connectionRef.current.on('data', (data) => {
    //              console.log(data)
    //          })
    //      })
    //     setConnected(true)
      
    // }

    
    
       const handleCanPlay = () => {
        videoRef.current.play()
       }


       if (videoRef.current){   console.log('VIDEOREF CURRENT SRCOBJECT: ',videoRef.current.srcObject)}
    return (
        <div>
             <h1>VideoChat with {friend}</h1>
             <Link to={{pathname: `/`}}  style={{textDecoration: 'none'}}>
                <p>BACK...</p>
            </Link>
            {/* {!connected && <h3>Please wait for your video peer... Again a spinner would be great!</h3>}   */}
        
            <Button onClick={startVideo} variant="contained"  sx={{backgroundColor: '#5885AF', margin: '30px'}} color="success">Start Video</Button>
            <Button onClick={stopVideo}>StopVideo</Button>
            <video style={{transform: "scaleX(-1)", height: '300px', width: '300px'}} ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
            <video style={{display: 'none'}} ref={ownVideo} />
        </div>
    )
}
