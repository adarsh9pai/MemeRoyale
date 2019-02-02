export const getRooms = async () => {
    return new Promise((resolve, reject) => {
        fetch('http://34.238.153.107/rooms')
        .then(res => alert(res.name))
        .catch(err => reject(err));
    })
}

//{"rooms":["name":"F0826","code":"F0826"}]}