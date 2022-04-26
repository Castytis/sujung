const express = require('express');
require('./config/database');
const teachers = require('./routes/api/teacher');
const parents = require('./routes/api/parent');
const meetings = require('./routes/api/meeting');
const authTeacher = require('./routes/api/auth-teacher');
const authParent = require('./routes/api/auth-parent');
const password = require('./routes/api/password');

const app = express();

app.use(express.json({ extended: false }));

app.use('/api/teachers', teachers);
app.use('/api/parents', parents);
app.use('/api/meetings', meetings);
app.use('/api/auth-teacher', authTeacher);
app.use('/api/auth-parent', authParent);
app.use('/api/password', password);

module.exports = app;
