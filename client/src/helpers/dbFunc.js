export const fetchUserData = (userInput, pwInput) => {
    // Check if user exist in DB
    // && hand over socket.id to DB
    // if register works - clear old socket.id entries and register new socket.id
    
    //after login:
    // go through the friends array and check if one of them is registered right now (findAll(socketID !== 0) and double check if socket id is valid)
    //send them a isNowActive signal
    // give back a is active friends array

    
    
    
    const data = {id: pwInput, userName: userInput, email: 'puck@puck', friends: [1,2,3]}




    return data
}