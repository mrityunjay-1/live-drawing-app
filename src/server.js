const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const hbs = require('hbs');
const { addUser, getUser, removeUser, getUsersInTheRoom } = require('./user-info/track-user');

const server = express();

const app = http.createServer(server);
const io = socketio(app);


// public files
server.use(express.static(path.join(__dirname, '../public')));
// views and partials
// server.set('view engine', 'hbs');
// server.set('views', path.join(__dirname, '../public/templates/views'));
// hbs.registerPartials(path.join(__dirname, '../public/templates/partials'));

server.get('/', (req, res) => {
  res.render("loginpage");
});

io.on("connection", (socket) => {

  socket.on("join", ({ username, room }) => {
    // console.log("socket ID = ", socket.id);
    const { error, user } = addUser({ id: socket.id, username, room });
    if (error) {
      console.log(error);
      return;
    }
    // console.log("All Users =  ", getUsersInTheRoom(room));
    socket.join(room);
    socket.emit("welcome_message", `Hello, ${username}`);

    // just for checking
    // console.log(users);
  });



  socket.on("drawing", (x0, y0, x1, y1, color) => {
    const user = getUser(socket.id);
    // console.log("Socket Id = ", socket.id);

    if (user) {
      // console.log(user);
      io.to(user.room).emit("drawingnew", x0, y0, x1, y1, color);
    }
    // this is working very fine
    // io.emit("drawingnew", x0, y0, x1, y1, color);
  });


  socket.on('disconnect', () => {
    const user = removeUser(socket.id);
    console.log("removed User  = ", user);

  })

});

app.listen(process.env.PORT, () => {
  console.log("server is up on port: " + process.env.PORT);
});