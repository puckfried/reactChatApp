import React, {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/user'

const PrivateRoute = ({component: Component, ...rest}) => {
    
    const {authIsDone} = useContext(UserContext)
    console.log('AUTHISDONE', authIsDone)
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            authIsDone ?
                <Component {...props} />
            : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;