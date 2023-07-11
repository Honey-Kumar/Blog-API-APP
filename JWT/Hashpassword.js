const bcrypt = require("bcrypt")
const Hashpassword = async (password) => {
    const salt = await bcrypt.genSalt(10)
    const newpassword = await bcrypt.hash(password, salt)
    console.log(newpassword)
    return newpassword
}

const Comparepassword = async (tocheck, tomatch) => {
    const check = await bcrypt.compare(tocheck, tomatch)
    return check
}
module.exports = { Hashpassword, Comparepassword }