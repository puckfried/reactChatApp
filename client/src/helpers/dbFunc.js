
const serverUrl = 'http://localhost:5000'
// const serverUrl = 'https://serene-river-49929.herokuapp.com'

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
  
export const addNewUser = async(data) => {
  try {
    const res = await (
      await fetch(`${serverUrl}/user/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      })
    ).json();
    console.log('RESS ISS ', res)
    return res;
  }catch(error){
    console.log('ERRRORR ', error)
    return error
  }
}

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