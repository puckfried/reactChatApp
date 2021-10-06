import {createContext} from "react";
import socketIOClient from "socket.io-client";


const ENDPOINT = 'http://127.0.0.1:5000';
// const ENDPOINT =  "https://serene-river-49929.herokuapp.com/"
export const socket = socketIOClient(ENDPOINT);
export const SocketContext = createContext();