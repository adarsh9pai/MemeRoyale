const baseURL = /* INSERT IP HERE*/;

export const getRooms = async () => {
  const response = await fetch(`${baseURL}/rooms`);
  const getResponse = await response.json();
  return getResponse.rooms;
};

export const createUser = async email => {
  const response = await fetch(`${baseURL}/users/create?username=${email}`);
  const getResponse = await response.json();
  return getResponse;
};

export const createRoom = async roomName => {
  const response = await fetch(`${baseURL}/rooms/create?name=${roomName}`);
  const getResponse = await response.json();
  return getResponse;
};

export const getUsersinRoom = async roomCode => {
  const response = await fetch(`${baseURL}/users?room=${roomCode}`);
  const getResponse = await response.json();
  return getResponse.users;
};

export const startGame = async roomCode => {
  const response = await fetch(`${baseURL}/rooms/start?room=${roomCode}`);
  const getResponse = await response.json();
};

export const getRoom = async roomCode => {
  const response = await fetch(`${baseURL}/rooms/room?room=${roomCode}`);
  const getResponse = await response.json();
  return getResponse[0];
};

export const selectMeme = async (roomCode, memeURL) => {
  const response = await fetch(
    `${baseURL}/rooms/meme/select?room=${roomCode}&meme=${memeURL}`
  );
  const getResponse = await response.json();
};

export const castVote = async (roomCode, userVotedFor) => {
  const response = await fetch(
    `${baseURL}/rooms/meme/vote?room=${roomCode}&name=${userVotedFor}`
  );
  const getResponse = await response.json();
};

export const getWinner = async (roomCode) => {
  const response = await fetch(
    `${baseURL}/rooms/winner?room=${roomCode}`
  );
  const getResponse = await response.json();
  return getResponse[0];
};

export const nextRound = async (roomCode) => {
  const response = await fetch(
    `${baseURL}/rooms/round?room=${roomCode}`
  );
  const getResponse = await response.json();
};
