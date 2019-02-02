export const getRooms = async()=>{
    const response = await fetch('http://34.238.153.107/rooms')
    const getResponse = await response.json()
    console.log(getResponse.rooms[0].code)
    alert(getResponse.rooms[0].code + " " + getResponse.rooms[0].name)

    return [getResponse.rooms]
}


//{"rooms":["name":"F0826","code":"F0826"}]}