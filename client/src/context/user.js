import React, {createContext, useEffect, useState} from "react";
import { authenticateUser } from "../helpers/dbFunc";


export const UserContext = createContext()

const UserProvider = ( {children} ) => {
    const [user, setUser] = useState({
        id: 0,
        userName: "",
        email: "",
        friends: []
    })
    
    const [authIsDone, setAuthIsDone ] = useState(false)
    const exportData = {user, setUser, authIsDone, setAuthIsDone}


    useEffect( () => {
        const authMe = async () => {
        try {
          const res = await authenticateUser();
  
          if (!res.error) {
            setUser(res);
            setAuthIsDone(true);
            return;
          }
          setUser();
          setAuthIsDone(true);
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