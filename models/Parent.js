const mongoose = require('mongoose');

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
  child: [
    {
      childName: {
        type: String,
      },
      childSurname: {
        type: String,
      },
    },
  ],
});

const Parent = mongoose.model('parent', ParentSchema);

module.exports = Parent;
