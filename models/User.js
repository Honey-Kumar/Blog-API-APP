const mongoose = require("mongoose")
const validator = require("validator");
const { Hashpassword } = require("../JWT/Hashpassword");
const UserSchema = mongoose.Schema({
    name: { type: String, required: [true, 'User Must have Name'] },
    email: { type: String, required: [true, 'User Must have Email'], unique: true, validator: [validator.isEmail, 'Please Enter a valid Email Address'] },
    password: { type: String, required: true, min: [8, 'Password must have atleast 8 characters'], max: [16, 'Password must have maximum 16 characters'], select: false },
    avatar: {
        public_id: { type: String, required: true },
        url: { type: String, required: true }
    },
    role: { type: String, default: 'User' },
    createdAt: { type: Date, default: Date.now }
},
    { timestamps: true }
)
module.exports = mongoose.model('User', UserSchema, 'UserData')

UserSchema.pre('save', async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    this.password = Hashpassword(this.password)
}
)