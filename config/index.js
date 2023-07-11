const dotenv = require("dotenv")
dotenv.config({ path: '../.env' })
const port = process.env.PORT
const DBKEY = process.env.DBKEY
const getAccesstoken = process.env.ACCESSTOKEN
module.exports = { port, DBKEY, getAccesstoken }