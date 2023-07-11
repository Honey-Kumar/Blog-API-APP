const express = require("express")
const { RegisterUser, LoginUser, Logout, Becomeauthor, deleteUser } = require("../controller/User")
const { ProtectedLogin } = require("../Middleware/Protected")
const UserRouter = express.Router()

UserRouter.post('/register', RegisterUser)
UserRouter.post('/login', LoginUser)
UserRouter.post('/logout', Logout)
UserRouter.put('/user/:id', ProtectedLogin, Becomeauthor)
UserRouter.delete('/user/delete', ProtectedLogin, deleteUser)
module.exports = UserRouter
