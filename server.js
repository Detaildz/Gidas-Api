const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
// const http = require('http');
const socketIo = require('socket.io');

require('dotenv').config();

const PORT = process.env.PORT || 3000;
const app = express();

// const server = http.createServer(app);

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

let baseURL;

process.env.NODE_ENV === 'production'
  ? (baseURL = 'https://gidas.vercel.app')
  : (baseURL = 'http://localhost:5173');

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: baseURL,
    methods: ['GET', 'POST'],
  },
});

app.use(
  cors({
    origin: [baseURL],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);

app.options('*', cors());

app.use(express.json());

app.use('/trucks', require('./routes/truckGetter.routes'));
app.use('/trucks', require('./routes/truckSetter.routes'));
app.use('/users', require('./routes/user.routes'));

app.get('/', (req, res) => {
  res.send('IT WORKS!');
});

// Socket io

io.on('connection', (socket) => {
  console.log('connected:', socket.id);

  socket.on('message', (data) => {
    socket.broadcast.emit('message', data);
  });

  socket.on('inputChange', (data) => {
    socket.broadcast.emit('inputChange', data);
  });
});
