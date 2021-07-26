const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const managerSchema = new mongoose.Schema({
    firstname: {
      type: String,
      trim: true,
      required: "Please provide first name",
    },
    lastname: {
      type: String,
      required: "Please provide last name",
      trim: true,
    },
    username: {
        type: String,
        required: "Please provide user name",
        unique: true,
        trim: true,
      }
    

  });
  managerSchema.plugin(passportLocalMongoose);
// managerSchema.plugin(passportLocalMongoose, { usernameField: 'email' })
module.exports = mongoose.model('Manager', managerSchema);
