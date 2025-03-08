const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const adminSchema = new Schema({

    email: {
        type: String,
        // require: true
    },
    password: {
        type: String,
        // require: true
    },
    username: {
        type: String
    },
    
},
    {
        timestamps: true
    })

const adminlogin = mongoose.model('user', adminSchema);
module.exports = adminlogin;