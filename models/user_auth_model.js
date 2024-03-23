const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserAuthSchema = new Schema({
    personal_contact_number: {
        type: String,
        required: true
    },
    user_auth_token: {
        type: String,
        required: true
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

module.exports = UserAuth = mongoose.model('user_auth', UserAuthSchema);
