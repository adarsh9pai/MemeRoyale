const baseURL = 'http://34.238.153.107';

export const getRooms = async()=>{
    const response = await fetch(`${baseURL}/rooms`)
    const getResponse = await response.json()
    return getResponse.rooms;
}

export const createRoom = async(roomName) => {
    const response = await fetch(`${baseURL}/rooms/create?name=${roomName}`)
    const getResponse = await response.json()
    console.log(getResponse);
    // returns a success or failure response
}

export const getUsersinRoom = async(roomCode) => {
    console.log('room code', roomCode);
    const response = await fetch(`${baseURL}/users?room=${roomCode}`)
    const getResponse = await response.json()
    console.log(getResponse);
    return getResponse.users;
}