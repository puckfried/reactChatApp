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
const serverUrl = 'http://localhost:5000'


export const loginUser = async (user, pw) => {
    const data = {
        username: user,
        password: pw    
    }
    console.log('LOGIN STARTED!', data)
    try {
        const res = await (
        await fetch(`${serverUrl}/user/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          credentials: 'include',
        })
      ).json();
      return res;
    } catch (error) {
      return error;
    }
  };
  


export const authenticateUser = async() => {
    try {
        const res = await (
          await fetch(`${serverUrl}/user/auth`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
          })
        ).json();
        return res;
      } catch (error) {
        return error;
      }
}

export const registerUserDb = async(userId, socketId) => {
  console.log('REGISTER IN DB SHOULD WORK...', userId, socketId)
  try {
    const res = await (
      await fetch(`${serverUrl}/user/${userId}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({socketId}),
        credentials: 'include'
      })
    ).json();
    return res;

  } catch(error){
    return error
    }
}

export const findUser = async(userId, input) => {
  try {
    const res = await (
      await fetch(`${serverUrl}/user/${userId}/findfriend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({input}),
        credentials: 'include'
      })
    ).json();
    return res
  } catch(error){
    return error
  }
} 

export const sendAddFriend = async(userId, friendId) => {
  try {
    const res = await(
      await fetch(`${serverUrl}/user/${userId}/addfriend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({friendId}),
        credentials: 'include'
      })
    ).json();
  }catch(error){
    return error
  }
}


export const listFriends = async(userId) => {
  try {
    const res = await (
      await fetch(`${serverUrl}/user/${userId}/findrelations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
    ).json();
   
    return res
  } catch(error){
    return error
  }
}

export const searchOnlineFriends = async(userId, onlineNow) => {
  const friends = await listFriends(userId)
  if (!friends.error && friends.length>0) {
    const friendsListOffline = []
    const friendListOnline = friends.map(element => {
      if (onlineNow.includes(element.socketId)) {
        return element
        } else {
        friendsListOffline.push(element)
        }
      })
    const cleanUpOnline = friendListOnline.filter(element => element)
    const friendsList = {online: cleanUpOnline, offline: friendsListOffline }
    return friendsList
  }
}

export const logout = async() => {
  try {
    const res = await (
      await fetch(`${serverUrl}/user/logout`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      })
    ).json();
   
    return res
  } catch(error){
    return error
  }
}