const mongoose = require("mongoose");

const CoursesSchema = mongoose.Schema({
    email : {
        type : String,
        required : true,
    },
    course_id : {
        type: mongoose.Schema.Types.ObjectId
    },
    role : {
        type: String,
        required : true
    },
    skills : { 
        type: String,
        required : true
    },
    exp : {
        type: String,
        required : true
    },
    description: {
        type: String
    }
});

const Courses = mongoose.model("Courses",CoursesSchema);

module.exports = Courses;