import './App.css';
import React, {useContext} from 'react'
import {SocketContext, socket} from './context/socket.js'
import { Route, Switch } from 'react-router-dom';
import {UserContext} from './context/user.js'

import Chat from './Pages/Chat';
import Main from './Pages/Main';
import Login from './Pages/Login';
import Signin from './Pages/SignIn';

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
        <Switch>
          {!user.username ? 
            <>
              <Route exact path='/signup' component={Signin} />
              <Route exact path='/' component={Login} />
            </>
            :
            <SocketContext.Provider value={socket}>
              <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', gap:'30px', flexWrap: 'nowrap'}}> 
             
                <Route path='/chat'  component={Chat} />
                <Route path='/peer' component={PeerView} />
                <Route path='/add' component={Add} />
                <Route exact path='/' component={Main} />

              </Box>
            </SocketContext.Provider>
            
        }
        </Switch>
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
