export const getRooms = async()=>{
    const response = await fetch('http://34.238.153.107/rooms')
    const getResponse = await response.json()
    return getResponse.rooms;
}

export const createRoom = async(roomName) => {
    const response = await fetch(`http://34.238.153.107/rooms/create?name=${roomName}`)
    const getResponse = await response.json()
    // returns a success or failure response
}