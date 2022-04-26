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
  resetLink: {
    data: String,
    default: '',
  },
});

const Parent = mongoose.model('parent', ParentSchema);

module.exports = Parent;
