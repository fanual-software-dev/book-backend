
const mongoose = require('mongoose')
const Book = require('../models/booksModel')


// function to get all books

const GET_ALL_BOOKS = async(req,res)=>{

    const userid = req.session.userid

    if (!userid){
        return res.status(400).json({message:"bad request. ID not found"})
    }

    try {

        const books = await Book.find({createdBy:userid})
        return res.status(200).json(books)

    } catch (error) {

        console.log(error)
        return res.status(404).json({message:error})
    }
}

// function to get a single book

const GET_SINGLE_BOOK = async(req,res)=>{

    const userid = req.session.userid

    if (!userid){
        return res.status(400).json({message:"bad request"})
    }

    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"opps the id is not a valid object id"})
        }

        const book = await Book.findById({_id:id,createdBy:userid})

        return res.status(200).json(book)

    } catch (error) {

        console.log(error)
        return res.status(404).json({message:error})
    }
}

// function to create a book

const CREATE_A_BOOK = async(req,res)=>{

    const {title,author,releasedDate,image} = req.body
    const userid = req.session.userid

    if (!userid){
        return res.status(400).json({message:"bad request"})
    }

    if (!title || !author || !releasedDate){
        return res.status(400).json({message:"Please fill out all the fields."})
    }

    try {
        const createdBy = userid
        const book = await Book.create({title,author,releasedDate,image, createdBy})
        return res.status(201).json(book)

    } catch (error) {
        console.log(error)
        return res.status(500).json({message:error})
    }
}

// function to delete a book

const DELETE_A_BOOK = async(req,res)=>{

    const userid = req.session.userid 

    if (!userid){
        return res.status(400).json({message:"bad request"})
    }

    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"opps the id is not a valid object id"})
        }

        const book = await Book.findByIdAndDelete({_id:id, createdBy:userid})

        return res.status(200).json(book)

    } catch (error) {

        console.log(error)
        return res.status(404).json({message:error})
    }
}

// function to update a book

const UPDATE_A_BOOK = async(req,res)=>{

    const userid = req.session.userid

    if (!userid){
        return res.status(400).json({message:"bad request"})
    }

    try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({message:"opps the id is not a valid object id"})
        }

        const book = await Book.findByIdAndUpdate({_id:id,createdBy:userid},{...req.body})

        return res.status(200).json(book)

    } catch (error) {

        console.log(error)
        return res.status(404).json({message:error})
    }
}

module.exports = { GET_ALL_BOOKS, GET_SINGLE_BOOK, CREATE_A_BOOK, DELETE_A_BOOK, UPDATE_A_BOOK}

