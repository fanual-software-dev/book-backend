const express= require('express')
const router = express.Router()
const {SIGN_UP,LOG_IN,GET_USERS,LOG_OUT,DELETE_A_USER} = require('../controllers/usersController')

// Router to get all users

router.get('/',GET_USERS)

// Router to sign up

router.post('/signup',SIGN_UP)

// Router to login

router.post('/login',LOG_IN)

// Router to log out

router.post('/logout',LOG_OUT)

router.delete('/delete/:id',DELETE_A_USER)

module.exports = router


