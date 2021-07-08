const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(

    {
        name: {
            type : String,
            required : true,
            maxlength : 32,
            trim : true
        },
        email: {
            type : String,
            trim : true,
            required : true,
            unique : true
        },
        phone: {
            type: String,
            maxlength:10
        },
        password: {
            type: String
        },
        role : {
            type : Number
        },
    },{
        timestamps: true
    }
        
);

// active becomes true once the email of the user is verified.

const User = mongoose.model('users', userSchema);
module.exports = User;
