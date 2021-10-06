import {createContext} from "react";
import Peer from 'peerjs'

const randomId = Math.floor(Math.random()*100000) 


export const peer = new Peer(randomId, {
    host: 'localhost',
    port: 5000,
    path: '/peerjs/myapp',
    config: {'iceServers': [
        {url: 'stun:stun.l.google.com:19302'}
    ]}
})

export const PeerContext = createContext();