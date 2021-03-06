import express from 'express';
import cors from 'cors'
import {Server} from 'socket.io'
import { ExpressPeerServer } from 'peer';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import userRoute from './routes/userRoute.js'
import config from './config/config.js'


//mongoose Setup
mongoose
  .connect(config.mongooseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(`Connection to DB established!!`))
  .catch((err) => {
    console.log(`We can not connect to the DB ->`, err);
  });



//Express Setup
const app = express()


const PORT = config.port

app.use( express.json())

app.use(cors({ origin: config.frontendOrigin, credentials: true }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Main Page')
})

app.use('/user', userRoute)

const http = app.listen(PORT, () => {console.log(`listening on Port${PORT}`)})

app.use(function errorHandler(err, req, res, next) {
    res.status(err.status || 400).send({
      error: {
        message: err.message,
        status: err.status,
      },
    });
  });

//Socket setup
const newSocketConnection = (socket) => {
    
    
    const registerUser = async (data) => {
        const allUser = await io.fetchSockets() 
        const userArray = allUser.map(element => {
            return element.id
        })
        io.emit('handshake', userArray)
    } 

    const startGroupChat = data => {
        console.log('group chat started and ', socket.id, ' joined!')
        socket.join('group')
    }

    const startPrivateChat = data => {
        const {theOther, type} = data
        console.log(socket.id, ' opened room for ', data )
        socket.join(`private-${socket.id}`)
        socket.to(theOther).emit(`${type}`, socket.id, 'Lets talk')
    }

    const joinPrivateChat = data => {
        socket.join(data)
        io.in(data).emit('privateHandshake', data)
        console.log(socket.id, ' joined the room ', data)
    }

    const newGroupMsg = data => {
        console.log('group chat MSg: ', data,' will be distributed')
        socket.to("group").emit('groupMsg', data);
    }

    const newPrivatMsg = data  => {
        const {header, payload} = data
        socket.to(header).emit('privateMsg', data)
        console.log('A private Msg ', payload,' to the room ', header)
    }


    console.log('user connected', socket.id)
    socket.on('register', registerUser)
    socket.on('newGroup', startGroupChat)
    socket.on('private', startPrivateChat)
    socket.on('joinPrivate', joinPrivateChat)
    socket.on('groupMsg', newGroupMsg)
    socket.on('privateMsg', newPrivatMsg)
    socket.on('disconnect', () => {
        registerUser()
        socket.removeAllListeners()
    })

    } 


export const io = new Server(http,{cors: {origin: '*'}})

//When socket Connection established - start listeners
io.on('connection', newSocketConnection)


//Peer Server
const peerServer = ExpressPeerServer(http, {
  debug: true,
  allow_discovery: true,  
  
})



app.use('/peerjs', peerServer)
peerServer.on('connection', (client) => {console.log('new PEER client: ', client.id)})
peerServer.on('disconnect', (client) => { console.log('PEER client disconnected: ', client.id)});

