const OtpModel = require('../models/opt');
const otpGenerator = require('otp-generator');
const twilio = require('twilio');

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN

const twilioClient = new twilio(accountSid,authToken)

exports.sendOtp = async (req,res) => {
    try {
        const otp = otpGenerator.generate(6, { upperCaseAlphabets:false, specialChars: false, lowerCaseAlphabets:false })
        console.log(otp)
        const {MobileNumber } = req.body

        const cDate = new Date()

        await OtpModel.findOneAndUpdate(
            { MobileNumber },
            { otp, otpExpiration : new Date(cDate.getTime()) },
            { upsert:true, new: true, setDefaultsOnInsert:true }
        )

        await twilioClient.messages.create({
            body: `Your OTP is ${otp}`,
            to:MobileNumber,
            from:process.env.TWILIO_PHONE_NUMBER
        })

        return res.status(200).json({
            message: 'OTP sent Successfully',
            otp: otp,
        })

    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}