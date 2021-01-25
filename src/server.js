const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const path = require('path');
const hbs = require('hbs');

const server = express();

const app = http.createServer(server);
const io = socketio(app);


// public files
server.use(express.static(path.join(__dirname, '../public')));
// views and partials
server.set('view engine', 'hbs');
server.set('views', path.join(__dirname, '../public/templates/views'));
hbs.registerPartials(path.join(__dirname, '../public/templates/partials'));

server.get('/', (req, res) => {
  res.render("index");
})

io.on("connection", (socket) => {
  socket.on("drawing", (x0, y0, x1, y1, color) => {
    // console.log(x0, y0, x1, y1, color);
    io.emit("drawingnew", x0, y0, x1, y1, color);
  });

  socket.emit("message", "Hello World");

});

app.listen(process.env.PORT, () => {
  console.log("server is up on port: " + process.env.PORT);
})