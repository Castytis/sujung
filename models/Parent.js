const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const ParentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  surname: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  children: [
    {
      childName: {
        type: String,
        required: true,
      },
      childSurname: {
        type: String,
        required: true,
      },
    },
  ],
});

const Parent = mongoose.model('parent', ParentSchema);

module.exports = Parent;
