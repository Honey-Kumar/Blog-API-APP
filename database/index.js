const mongoose = require('mongoose')
const { DBKEY } = require('../config')
const connectdb = async () => {
    await mongoose.connect(DBKEY).then((response) => console.log(`Blog App is Successfully Connected to Databse : ${response.connection.host}`))
}
module.exports = connectdb