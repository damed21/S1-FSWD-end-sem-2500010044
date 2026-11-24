const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    studentId: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    phone: {
        type: String
    },

    department: {
        type: String
    },

    year: {
        type: Number
    },

    semester: {
        type: Number
    },

    courses: [
        {
            name: String,
            marks: Number,
            attendance: Number
        }
    ],

    cgpa: {
        type: Number
    }
});

module.exports = mongoose.model("Student", studentSchema);