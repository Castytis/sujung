const express = require('express');
const connectDB = require('./config/database');
const teachers = require('./routes/api/teacher');
const parents = require('./routes/api/parent');
const meetings = require('./routes/api/meeting');
const authentication = require('./routes/api/authentication');

const app = express();
const PORT = 5000;

connectDB();
app.use(express.json({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.use('/api/teachers', teachers);
app.use('/api/parents', parents);
app.use('/api/meetings', meetings);
app.use('/api/authentication', authentication);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
