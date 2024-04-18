const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

require('dotenv').config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.use('/trucks/', require('./routes/truckGetter.routes'));
app.use('/trucks', require('./routes/truckSetter.routes'));
app.get('/', (req, res) => {
  res.send('Hello Backend!');
});
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
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
