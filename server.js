require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const Secret = process.env.SECRET
const URI = process.env.MONGO_URI
const PORT= process.env.PORT
const app = express()
const bookrouter = require('./routes/booksRoute')
const userrouter = require('./routes/userRoute')
const cors = require('cors')
const bodyParser = require('body-parser')

mongoose.connect(URI)
    
    .then(()=>{
        app.listen(PORT,()=>{
            console.log(`connected to db && listening to port ${PORT}`)
        })
    })

    .catch((error)=>{
        console.log(error)
    })

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    console.log(req.path,req.method)
    next()
})


app.use(session({
    secret:Secret,
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge: 3600*1000}
}))


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(express.json())
app.use('/api/books',bookrouter)
app.use('/user',userrouter)


