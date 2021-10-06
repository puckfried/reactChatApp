import React, { useRef, useEffect, useState } from 'react'
import Peer from 'peerjs'
import { Link, Redirect } from 'react-router-dom';
import  Button  from '@mui/material/Button';


export default function PeerView({location}) {
    const peer = useRef(null)
    const {state} = location  
    const {id, friend} = state
    

    const [connected, setConnected] = useState(false)
    const connectionRef = useRef(null)
    const videoRef = useRef(null)
    const ownVideo = useRef(null)
    const callRef = useRef(null)

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
        callRef.current.close()
        console.log('THE CALLREF IS CLOSED? ',callRef.current)
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
            console.log('Something is wrong: ',error)
        }
       }


//Initialising the peer 
    useEffect(() => {
        console.log('PPER SHOULD BE CREATED!!: ', peer.current)
        peer.current= new Peer(id, {
            host: 'localhost',
            port: 5000,
            path: '/peerjs/myapp',
            config: {'iceServers': [
                {url: 'stun:stun.l.google.com:19302'}
            ]}
        })
        //Try to connect to other
        connectionRef.current = peer.current.connect(friend)
        console.log('TRY to connect to other peer ', connectionRef.current)
        peer.current.on('connection', function(conn){
             console.log('connected!!')
             setConnected(true)
            //  startVideo()
            //  connectionRef.current = conn
        console.log('CREATED: ', peer.current)
    })
},[])


//Event Listener for incoming peer requests
    useEffect(() => {
        // connectionRef.current = peer.current.connect(friend)
        // peer.current.on('connection', function(conn){
        //      console.log('connected!!')
        //      setConnected(true)
        //      startVideo()
        //      connectionRef.current = conn
           
            //NOT NEEDED ONLY FOR DATA CONNECTION
            // connectionRef.current.on('open', () => {
                // console.log('CONNECTIONREF on On fired')
                // connectionRef.current.on('data', (data) => {
                //     console.log('DATA ARRIVED')
                //     })
            // })
        // })

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
             <Link to={{pathname: `/`}}  style={{textDecoration: 'none'}} onClick={stopVideo}>
                <p>BACK...</p>
            </Link>
             {!connected && <h3>Please wait for your video peer... Again a spinner would be great!</h3>}   
        
            <Button onClick={startVideo} variant="contained"  sx={{backgroundColor: '#5885AF', margin: '30px'}} color="success">Start Video</Button>
            {/* <Button onClick={stopVideo}>StopVideo</Button> */}
            <video style={{transform: "scaleX(-1)", height: '300px', width: '300px'}} ref={videoRef} onCanPlay={handleCanPlay} autoPlay playsInline muted />
            <video style={{display: 'none'}} ref={ownVideo} />
        </div>
    )
}
