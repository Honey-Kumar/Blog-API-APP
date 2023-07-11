const { Hashpassword, Comparepassword } = require("../JWT/Hashpassword");
const Accesstoken = require("../JWT/jwt");
const { getAccesstoken } = require("../config");
const User = require("../models/User");
const ErrorCover = require("../utils/ErrorCover");
const jwt = require("jsonwebtoken")

const RegisterUser = async (req, res, next) => {
    try {
        const { name, email, password, avatar } = req.body
        // check that given data is already existed or not
        const finduser = await User.findOne({ email: email });
        if (finduser) {
            return next(new ErrorCover('User Already Existed with Same Email', 403))
        }
        const hashedpass = await Hashpassword(password)
        const newuser = await new User({
            name: name,
            email: email,
            password: hashedpass,
            avatar: avatar
        })
        const verifieduser = await newuser.save()
        const token = await Accesstoken(res, verifieduser._id)
        if (verifieduser) {
            return res.status(201).json({ message: 'User is Created Successfully', verifieduser, token })
        }
    } catch (error) {
        return next(new ErrorCover(`${error.message}`, error.statusCode))
    }
}

const LoginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return next(new ErrorCover('Gathered Invalid Credentials', 400))
        }
        const finduser = await User.findOne({ email }).select('password').select('name').select('email');
        console.log(finduser)
        if (!finduser) {
            return next(new ErrorCover('Invalid Credentials', 400))
        }
        const comparepass = await Comparepassword(password, finduser.password);
        if (!comparepass) {
            return next(new ErrorCover('Invalid Credentials', 400))
        }
        const token = await Accesstoken(res, finduser._id)
        console.log(token)
        return res.status(200).json({ message: "User Login Successfully", finduser, token })
    } catch (error) {
        return next(new ErrorCover(error.message, error.status))
    }
}

const Logout = async (req, res, next) => {
    res.cookie('cookie', '', {
        expireIn: new Date(Date.now())
    })
    return res.status(200).json({ message: 'User Logout Successfully' })
}

const Becomeauthor = async (req, res, next) => {
    try {
        const user = req.params.id;
        const getuser = await User.findById({ _id: user });
        if (!getuser) {
            return next(new ErrorCover('User not Existed or Might be deleted', 400))
        }
        getuser.role = 'Author'
        await getuser.save()
        return res.status(200).json({ message: 'You are Successfully registered as Author', getuser })
    } catch (error) {
        return next(new ErrorCover(error.message, error.status))
    }
}

const deleteUser = async (req, res, next) => {
    try {
        let Userdata;
        try {
            const token = req.cookies.cookie;
            const verifytoken = jwt.verify(token, getAccesstoken);
            const userId = await verifytoken.userid;
            Userdata = await User.findById({ _id: userId });
        } catch (error) {
            return next(new ErrorCover(error.message, error.status));
        }
        if (!Userdata) {
            return next(new ErrorCover('User not existed or might be deleted', 400));
        }
        const getdeleted = await User.deleteOne({ _id: Userdata._id })
        if (!getdeleted) {
            return next(new ErrorCover('User not deleted yet, Please try again Later', 403));
        }
        return res.status(200).json({ message: 'User Deleted Successfully' })
    } catch (error) {
        return next(new ErrorCover(error.message, error.status))
    }
}

module.exports = { RegisterUser, LoginUser, Logout, Becomeauthor, deleteUser }