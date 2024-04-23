const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

const server = http.createServer(app);
const io = socketIo(server, {
  pingTimeout: 60000,
});
// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI, {
      dbName: 'Gidas',
    });
    console.log('Database connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB();

app.use(
  cors({
    origin: [
      'https://gidas-api.vercel.app',
      'https://master--mano-gidas.netlify.app',
    ],
  })
);
app.use(express.json());

app.use('/trucks', require('./routes/truckGetter.routes'));
app.use('/trucks', require('./routes/truckSetter.routes'));
app.use('/users', require('./routes/user.routes'));

app.get('/', (req, res) => {
  res.send('IT WORKS!');
});

io.use((socket, next) => {
  socket.handshake.headers.origin = socket.handshake.headers.origin || '*';
  socket.handshake.headers['Access-Control-Allow-Origin'] =
    socket.handshake.headers.origin;
  next();
});

// WebSocket event handlers
// const io = require('socket.io')(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: [
//       'https://gidas-api.vercel.app',
//       'https://master--mano-gidas.netlify.app',
//     ],
//     methods: ['GET', 'POST'],
//   },
// });

io.on('connection', (socket) => {
  console.log('connected:', socket.id);

  socket.on('message', (data) => {
    socket.broadcast.emit('message', data);
  });

  socket.on('inputChange', (data) => {
    socket.broadcast.emit('inputChange', data);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
