const mongoose = require('mongoose')

const habitSchema = mongoose.Schema({
    name : {
        type : String,
        unique : true,
        trim : true
    },
    time : {
        type : Number,
        trim : true,
    },
    frequency : {
        type : String,
        trim : true
    }
},{timestamps : true})

const habitModel = mongoose.model('habits',habitSchema)
module.exports = habitModel

