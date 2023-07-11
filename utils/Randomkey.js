const crypto = require("crypto")
const getrandomkey = () => {
    const token = crypto.randomBytes(24).toString('hex')
    //var token = crypto.randomBytes(64).toString('hex');
    return token;
}
module.exports = getrandomkey