import './App.css';
import React, {useContext} from 'react'
import {SocketContext, socket} from './context/socket.js'
import { Route, Switch, Redirect } from 'react-router-dom';
import {UserContext} from './context/user.js'

import Chat from './Pages/Chat';
import Main from './Pages/Main';
import Login from './Pages/Login';
import Signin from './Pages/SignIn';
import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute';

import Header from './Components/Header';
import Footer from './Components/Footer';

import Paper from '@mui/material/Paper';
import { Grid, Box} from '@mui/material';
import PeerView from './Pages/Peer';
import Add from './Pages/Add';

function App() {
   
  const {user} = useContext(UserContext)
  return (
    
    //  <PeerContext.Provider value={peer}>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        marginTop='5%'
        > 

     <Grid item lg={8} md={10} xs={12} >
      <Paper elevation={10} className='paper' sx={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
       <Grid container item xs={12}> 
        <Header />
       </Grid>  

       <Grid container item xs={12} >  
       <SocketContext.Provider value={socket}>
       <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap:'30px', flexWrap: 'nowrap'}}> 
        <Switch>
              <PublicRoute restricted={false} component={Login} path="/login" exact />
              <PublicRoute restricted={false} component={Signin} path="/signup" exact />
        
                <PrivateRoute component={PeerView} path="/peer" exact />
                <PrivateRoute component={Add} path="/add" exact />
                <PrivateRoute component={Chat} path="/chat" exact />
                <PrivateRoute component={Main} path="/" exact />
            <Redirect to='/' />
        </Switch>
        </Box>
        </SocketContext.Provider>
        </Grid>  
      
        <Grid container item xs={12}> 
          <Footer />
        </Grid>  
              
        </Paper>
       </Grid>

    </Grid>
    // </PeerContext.Provider>
   

  );
}

export default App;
