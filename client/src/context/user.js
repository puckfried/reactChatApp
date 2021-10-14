import React, {createContext, useEffect, useState} from "react";
import { authenticateUser, registerUserDb } from "../helpers/dbFunc";


export const UserContext = createContext()

const UserProvider = ( {children} ) => {
    const [user, setUser] = useState({
        id: 0,
        username: "",
        email: "",
        friends: []
    })
    
    const [socketId, setSocketId] = useState(null)
    const [friends, setFriends] = useState(null)

    const [authIsDone, setAuthIsDone ] = useState(false)
    const exportData = {user, setUser, authIsDone, setAuthIsDone, socketId, setSocketId, friends, setFriends}


    useEffect( () => {
        const authMe = async () => {
        try {
          const res = await authenticateUser();
  
          if (!res.error) {
            // const register = await registerUserDb(res._id, )
            console.log('User is set in CONTEXT', res)
            setUser(res);
            setAuthIsDone(true);
            return;
          }

        } catch (error) {
            console.log(error)
        }
      };
  
      authMe();
},[])

return (
    <UserContext.Provider value={exportData}>
        {children}
    </UserContext.Provider>
)}

export default UserProvider