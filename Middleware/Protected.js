const { getAccesstoken } = require("../config")
const User = require("../models/User")
const ErrorCover = require("../utils/ErrorCover")
const jwt = require("jsonwebtoken")

const ProtectedLogin = async (req, res, next) => {
    try {
        let gettoken = req.cookies.cookie;
        console.log(gettoken)
        if (!gettoken) {
            return next(new ErrorCover('Please Log in to Blog First to use this Website', 403))
        }
        const getverify = jwt.verify(gettoken, getAccesstoken);
        console.log(getverify)
        if (!getverify) {
            return next(new ErrorCover('Authenication Failed, Please Login Again', 500))
        }
        const getuser = await User.findById(getverify._id)
        console.log(getuser)
        next()
    } catch (error) {
        return next(new ErrorCover(error.message, error.status))
    }
}


const OnlyAuthor = async (req, res, next) => {
    try {
        const accesstoken = req.cookies.cookie
        // console.log(accesstoken)
        const verifytoken = jwt.verify(accesstoken, getAccesstoken)
        const userId = await verifytoken.userid;
        // console.log(userId)
        const userdetails = await User.findById(userId);
        // console.log(userdetails)
        if (userdetails.role === 'Author') {
            next();
        } else {
            return next(new ErrorCover(`Only Author Can Write a Blog Post`, 403))
        }
    } catch (error) {
        return next(new ErrorCover(error.message, error.status))
    }
}

module.exports = { ProtectedLogin, OnlyAuthor }