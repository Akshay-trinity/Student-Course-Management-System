const StudentCourse = require('../model/studentCoursesModel')


const show = async (req, res, next) => {
    try {
        const data = await StudentCourse.find().populate('courseId').populate('studentId')
        if (!data) {
            return res.json("no data found")
        } else {
            return res.status(200).json(data)
        }

    }
    catch (err) {
        return res.status(400).json("errorFound", err)
    }
}
const register = async (req, res, next) => {
    try {

        const { courseId, studentId } = req.body
        if (!(courseId && studentId)) {
            return res.status(400).send("All inputs are required")
        }
        const existing = await StudentCourse.findOne({ courseId })
        if (existing) {
            return res.status(400).send("user is already exist.Please login")
        }
        const data = await StudentCourse.create({
            courseId,
            studentId
        });
        return res.status(201).json({
            message: "student course created", data
        })
    }
    catch (err) {
        console.log("error", err);
        res.json(err)
    }
}
const update = async (req, res, next) => {
    try {
        let findUser = await StudentCourse.findById({ _id: req.body._id })
        if (!findUser) {
            return res.json({
                message: "user not found"
            })
        }
        var updateData = {
            courseId: req.body.courseId,
            studentId: req.body.studentId
        }
        await StudentCourse.updateOne({ $set: updateData })
        return res.status(200).json({
            message: "user data updated", updateData
        })
    }
    catch (err) {
        console.log("error", err);
        return res.status(400).json(err)
    }
}



const deleteUser = async (req, res, next) => {
    try {
        await StudentCourse.findByIdAndDelete(req.params.id)
        return res.json("user deleted successfully")
    }
    catch (err) {
        console.log("error", err);
        return res.status(400).json(err)

    }
}

module.exports = {
    register,
    show,
    deleteUser,
    update
}



