let users = [];

const addUser = ({ id, username, room }) => {
  // data sanitization
  username = username.toLowerCase();
  room = room.toLowerCase();

  // now let's find out that the user is already exist or not ?
  let userIndex = users.findIndex((user) => {
    return user.id === id;
  });

  if (userIndex >= 0) {
    return { error: "user is already present in the room." };
  }

  let user = {
    id, username, room
  }

  users.push(user);
  return user;
};

const getUser = (id) => {
  let userIndex = users.findIndex((user) => {
    return user.id === id;
  });
  // console.log(userIndex);
  return users[userIndex];
};


const removeUser = (id) => {
  let userIndex = users.findIndex((user) => {
    return user.id === id;
  });

  if (userIndex < 0) {
    return {
      error: `User not Found with this id = ${id}`
    }
  }

  const removedUser = users.splice(userIndex, 1)[0];
  return removedUser;
};

const getUsersInTheRoom = (room) => {
  room = room.toLowerCase();
  const usersInTheRoom = users.filter((user) => {
    return user.room === room;
  });
  // console.log("Users in the room = ", usersInTheRoom);

  return usersInTheRoom;
};


module.exports = {
  addUser, getUser, removeUser, getUsersInTheRoom
}