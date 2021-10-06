import React, {createContext, useState} from "react";

export const UserContext = createContext()

const UserProvider = ( {children} ) => {
    const [user, setUser] = useState({
        id: 0,
        userName: "",
        email: "",
        friends: []
    })
    
    const exportData = {user, setUser}


return (
    <UserContext.Provider value={exportData}>
        {children}
    </UserContext.Provider>
)}

export default UserProvider