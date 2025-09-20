const mongoose = require("mongoose");

const userContainsSchema = new mongoose.Schema({
    email :{
        type : String,
        required: true
    },
    session_id : {
        type: String,
        required: true
    }
},{timestamp : true});

const UserContains = mongoose.model("UserContains,UserContainsSchema");

module.exports = UserContains;