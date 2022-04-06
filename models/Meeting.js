const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MeetingSchema = new mongoose.Schema({
  organiser: {
    type: Schema.Types.ObjectId,
    ref: 'teacher',
  },
  title: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  text: {
    type: String,
  },
  date: {
    type: String,
    require: true,
  },
  time: {
    type: String,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  participants: {
    teachers: [
      {
        teacher: {
          type: Schema.Types.ObjectId,
          ref: 'teacher',
        },
      },
    ],
    parents: [
      {
        parent: {
          type: Schema.Types.ObjectId,
          ref: 'parent',
        },
      },
    ],
  },
});

const Meeting = mongoose.model('meeting', MeetingSchema);

module.exports = Meeting;
