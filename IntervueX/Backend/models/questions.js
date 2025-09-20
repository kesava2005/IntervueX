const mongoose = require("mongoose");

const questionsSchema = mongoose.Schema({
    email: {
        type: String,
        required : true
    },
    course_id: {
        type: String,
        required : true,
    },
    question_id : {
        type: mongoose.Schema.Types.ObjectId
    },
    question: { 
        type: String,
        default: "0 Q&A",
        required : true
    },
    answer: {
        type : String,
        required : true
    }
});

const questions = mongoose.model("questions",questionsSchema);

module.exports = questions;