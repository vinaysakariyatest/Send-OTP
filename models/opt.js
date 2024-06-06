const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    MobileNumber:{
        type: Number
    },
    otp:{
        type: Number
    },
    otpExpiration:{
        type:Date,
        default: Date.now,
        get:(otpExpiration) => otpExpiration.getTime(),
        set:(otpExpiration) => new Date(otpExpiration)
    }
})

module.exports = mongoose.model('Otp',otpSchema)