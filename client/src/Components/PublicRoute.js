import React,{useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/user'

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    
    const {authIsDone} = useContext(UserContext)
    
    return (
        // restricted = false meaning public route
        // restricted = true meaning restricted route
        <Route {...rest} render={props => (
            authIsDone && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;