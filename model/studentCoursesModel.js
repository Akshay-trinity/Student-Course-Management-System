const mongoose = require('mongoose')
const Schema = mongoose.Schema
const studentCourseSchema = new Schema({

    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    studentId: {
        type: Schema.Types.ObjectId,
        ref: 'Student'
    },

}, { timestamps: true })

const StudentCourse = mongoose.model('StudentCourse', studentCourseSchema)
module.exports = StudentCourse

