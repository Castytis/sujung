const express = require('express');
const connectDB = require('./config/database');
const connectToDB = require('./config/database');

const app = express();
const PORT = 5000;

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
