import React,{useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from '../context/user'

const PublicRoute = ({component: Component, restricted, ...rest}) => {
    
    const {authIsDone} = useContext(UserContext)
    
    return (
        <Route {...rest} render={props => (
            authIsDone && restricted ?
                <Redirect to="/" />
            : <Component {...props} />
        )} />
    );
};

export default PublicRoute;