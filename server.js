const express = require('express');
const connectDB = require('./config/database');
const teachers = require('./routes/api/teacher');
const parents = require('./routes/api/parent');
const meetings = require('./routes/api/meeting');
const authTeacher = require('./routes/api/auth-teacher');
const authParent = require('./routes/api/auth-parent');

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
app.use('/api/auth-teacher', authTeacher);
app.use('/api/auth-parent', authParent);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
