const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TempUserAuthSchema = new Schema({
    personal_contact_number: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    current_otp: {
        type: Number,
    },
    otp_token: {
        type: String,
        required: true
    },
    otp_issued_at: {
        type: Date,
        default: Date.now
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = TempUserAuth = mongoose.model('temp_user_auth', TempUserAuthSchema);
