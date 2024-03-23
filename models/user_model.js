const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: {
    type: String,
    default: 'New'
  },
  last_name: {
    type: String,
    default: 'User'
  },
  personal_email: {
    type: String,
    default: '',
  },
  personal_contact_number: {
    type: String,
    default: '',
  },
  personal_address: {
    type: String,
    default: '',
  },
  profile_image_id: {
    type: String,
    default: 'default.png'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = UserDetails = mongoose.model('user_details', UserSchema);
