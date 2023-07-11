const ErrorCover = require("../utils/ErrorCover");

const Handleerror = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500
    error.message = error.message || "Internal Server Error Occured"
    // first handle cast error
    if (error.name === 'CastError') {
        const message = 'Cast error Occured' + error.message + ' Error Ocuured At ' + error.path;
        const status = error.status
        return next(new ErrorCover(message, status))
    }

    // duplicate error 
    if (error.code === 11000) {
        const newmessage = `Duplicate ${Object.keys(error.keyValue)} Entered`
        error = new Errorcover(newmessage, 400);
    }

    // jsonwebtoken error
    if (error.Code === 'Jsonwebtoken') {
        const message = `Json Web Token is Invalid . Please Login Again`
        return next(new ErrorCover(message, 403))
    }

    // typeerror
    if (error.name === 'TypeError') {
        return next(new ErrorCover(error.message, error.status))
    }

    // Token Expire Error
    if (error.code === 'TokenExpireError' || error.code === 'jwt expired') {
        const newmessage = `jsonwebtoken is Expire . Please Login Again`
        error = new Errorcover(newmessage, 400);
    }

    res.status(error.statusCode).json({ message: error.message || error.stack })

}
module.exports = Handleerror