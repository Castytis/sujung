const mongoose = require('mongoose');

const MeetingSchema = new mongoose.Schema({
  organiser: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  subject: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  location: {
    type: String,
    require: true,
  },
  participants: [
    {
      teacher: {
        type: String,
        required: true,
      },
      parent: {
        type: String,
      },
    },
  ],
});

const Meeting = mongoose.model('parent', MeetingSchema);

module.exports = Meeting;
