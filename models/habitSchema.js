const mongoose = require('mongoose')

const habitSchema = mongoose.Schema({
    name : {
        type : String,
        unique : true,
        trim : true
    },
    time : {
        type : String,
        trim : true,
    },
    frequency : {
        type : Array,
    }
})

const habitModel = mongoose.model('habits',habitSchema)
module.exports = habitModel

