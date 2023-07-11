const jwt = require("jsonwebtoken")
const { getAccesstoken } = require("../config")
const Accesstoken = async (res, userid) => {
    const token = await jwt.sign({ userid }, getAccesstoken, {
        expiresIn: '4h'
    })
    res.cookie('cookie', token, {
        httpOnly: true,
        expire: new Date(
            Date.now + 8 * 24 * 60 * 60 * 100
        )
    })
}
module.exports = Accesstoken