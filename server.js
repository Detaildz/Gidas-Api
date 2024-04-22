const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIo(server);

app.use(cors());
app.use(express.json());

app.use('/trucks/', require('./routes/truckGetter.routes'));
app.use('/trucks', require('./routes/truckSetter.routes'));
app.use('/users', require('./routes/user.routes'));
app.get('/', (req, res) => {
  res.send('IT WORKSSSSSS!');
});

const MessageSchema = new mongoose.Schema({
  name: String,
  message: String,
});
const Message = mongoose.model('Message', MessageSchema);

io.on('connection', (socket) => {
  console.log('A client connected');

  // Fetch initial messages from MongoDB and emit to client
  Message.find().then((messages) => {
    socket.emit('initialMessages', messages);
  });

  // Listen for new message events from client
  socket.on('newMessage', (data) => {
    // Save new message to MongoDB
    const newMessage = new Message(data);
    newMessage.save().then(() => {
      // Broadcast new message to all clients
      io.emit('newMessage', newMessage);
    });
  });

  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

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

app.listen(PORT, () => {
  console.log(`listening on port http://localhost:${PORT}`);
});
