const mongoose = require("mongoose");

const rewardSchema = mongoose.Schema({
    name : {
        type : String,
        unique : true,
        trim : true
    }
}) 