import './App.css';
import React, {useState, useContext} from 'react'
import {SocketContext, socket} from './context/socket.js'
import { PeerContext, peer } from './context/peer.js';
import { Route, Switch } from 'react-router-dom';
import {UserContext} from './context/user.js'

import Chat from './Pages/Chat';
import Main from './Pages/Main';
import Login from './Pages/Login';

import Header from './Components/Header';
import Footer from './Components/Footer';

import Paper from '@mui/material/Paper';
import { Grid } from '@mui/material';
import PeerView from './Pages/Peer';

function App() {
   
  const {user} = useContext(UserContext)

  return (
    <SocketContext.Provider value={socket}>
     <PeerContext.Provider value={peer}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginTop='5%'
        > 

     <Grid item lg={6} md={8} xs={12} >
      <Paper elevation='10' className='paper' sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
       <Grid container item xs={12}> 
        <Header />
       </Grid>  

       <Grid item xs={12}>  
        <Switch>
         {user.username ?
            <Route exact path='/' component={Main} /> :
            <>
            <Route exact path='/' component={Login} />
            
            </>
        }
          
          <Route path='/login' component={Login} />
          
           <Route path='/chat'  component={Chat} />
        
          <Route path='/peer' component={PeerView} />
        </Switch>
        </Grid>  
      
        <Grid container item xs={12}> 
          <Footer />
        </Grid>  
              
        </Paper>
       </Grid>

    </Grid>
    </PeerContext.Provider>
    </SocketContext.Provider>

  );
}

export default App;
