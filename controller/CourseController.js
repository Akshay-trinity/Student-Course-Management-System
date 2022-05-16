const Course = require("../model/courseModel")

const showCourse = async(req,res)=>{
    try{

        const course = await  Course.find()
        if(!course){
       return res.json("no data found")
        }else{
            return res.json(course)
        }
    }
    catch (err) {
        console.log("error", err);
       return res.status(400).json(err)
    }
        
}


const register = async (req, res, next) => {
    try {

        const { title, status } = req.body
        if (!(title && status)) {
            return res.status(400).send("All inputs are required")
        }
        const existing = await Course.findOne({ title })
        if (existing) {
            return res.status(400).send("course is already exist.")
        }
        const data = await Course.create({
            title,
            status,

        });
        return res.status(201).json({
            //message: "welcome email has been sent", user
            message: "the course is registered", data
        })

    }
    catch (err) {
        console.log("error", err);
       return res.status(400).json(err)
    }
}


const update = async (req, res, next) => {
    try {
        let findCourse = await Course.findById({_id:req.body._id})
        if (!findCourse) {
            return res.json({
                message: "course not not found"
            })
        }
        var updateData = {
            title:req.body.title,
            status:req.body.status
        }
        await Course.updateOne({ $set: updateData })
        return res.json({
            message: "user data updated", updateData
        })
    }
    catch {
        console.log("error", err);
        return res.status(400).json(err)
    }
}



const deleteCourse = async (req, res, next) => {
    try {


        await Course.findByIdAndDelete(req.params.id)
     
        return res.json("deleted successfully")
    }
    catch (err) {
        console.log("error", err);
        res.status(400).json(err)

    }
}

module.exports = {
    register,
    showCourse,
    deleteCourse,
    update
}



