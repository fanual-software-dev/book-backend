
const mongoose = require('mongoose')

const BookModel = new mongoose.Schema({

    title: {

        type:String,
        required:true
    },

    author: {

        type:String,
        required:true
    },

    releasedDate: {

        type:Number,
        required:true
    },

    createdBy:{

        type: mongoose.Schema.Types.ObjectId, ref: 'user',
        required: true
    },

    image:{
        
        type:String,
        required: true
    }


},{timestamps:true}) 

const Book = mongoose.model('Book',BookModel)

module.exports = Book