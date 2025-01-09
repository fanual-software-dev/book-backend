const mongoose = require('mongoose')

const UserModel = new mongoose.Schema({

    firstname:{ type : String, required : true },
    lastname:{ type : String, required : true },
    email:{ type : String, required : true, unique:true},
    phone:{ type : Number, required : true },
    password:{ type : String, required : true },

},{timestamps:true})

module.exports = mongoose.model('userData',UserModel)