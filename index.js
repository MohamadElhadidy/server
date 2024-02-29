const http = require('http');
const { Server } = require('socket.io');
const express = require('express'); // Optional for API endpoint
const cors = require('cors')
const app = express(); // Optional for API endpoint

app.use(cors());

const server = http.createServer(app); // Optional for API endpoint
const io = new Server(server, {
  cors: {
    origin: '*', // Replace with your client origin
  }
});

const port = 1998;
io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('message', () => {
    console.log(`Message received: `);
    socket.broadcast.emit('message');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

app.post('message', (req, res) => {
  io.emit('message');
  res.json({ message: 'Message sent successfully' });
});

app.get('/', (req, res) => {
  io.emit('message');
  res.json({ message: 'Message sent successfully' });
});



server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
