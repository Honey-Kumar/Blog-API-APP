const express = require("express");
const bodyparser = require("body-parser")
const { port, DBKEY } = require("./config");
const cookieparser = require("cookie-parser")
const cors = require("cors")
const connectdb = require("./database");
const { router } = require("./router/Blog");
const UserRouter = require("./router/User");
const Handleerror = require("./Middleware/errorhandler");


//handling uncaught rejection error 
// example : console.log(youtube). if we type this directly to a code or without write in any function or if else condition  and anymore then uncaught rjection error falls
process.on('uncaughtException', (error) => {
    console.log(`Error Occured : ${error.message}`);
    console.log(`Exiting the server due to Uncaught Exception Error falls.........`);
    process.exit(1)
})


const app = express();
app.use(express.json())
app.use(cookieparser())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(UserRouter)
app.use(cors)
app.use(Handleerror)
app.use(bodyparser)
app.use(bodyparser.urlencoded({ extended: true }))
connectdb()
app.listen(port, console.log(`App is working on PORT : ${port}`))

// unhandled rejection error example : mongodb+srv://honeykumar987636:x9pUzlOphNySOJIn@cluster0.66doo8m.mongodb.net/ . if this monodb url will be incorrect in any case then server will crashed or show an error . so in this case when this error is not handled anywhere then it is called as unhandeled rejection error

process.on('unhandledRejection', (error) => {
    console.log(`Error occured : ${error.message}`)
    console.log('Shutting down the server due to Unhandled Rejection error..........');

    serverapp.close(() => {
        process.exit(1)
    })
})