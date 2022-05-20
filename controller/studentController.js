const Student = require('../model/studentModel')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")
const sendEmail = require('../nodeMailer/nodeMailer')


const show = async (req, res) => {
    try {

        const data = await Student.find()
        if (!data) {
            return res.status(404).json("no data found")
        } else {
            return res.status(200).json(data)
        }
    }
    catch (err) {
        console.log("error", err);
       return res.status(400).json(err)
    }
}

const register = async (req, res, next) => {
    try {

        const { firstName, lastName, address, email, password, phoneNumber } = req.body
        if (!(firstName && lastName && address && email && password && phoneNumber)) {
            return res.status(400).send("All inputs are required")
        }
        const existingUser = await Student.findOne({ email })
        if (existingUser) {
            return res.status(400).send("user is already exist.Please login")
        }
        const encryptUserPassword = await bcrypt.hash(password, 10)
        const data = await Student.create({
            firstName,
            lastName,
            address,
            email: email.toLowerCase(),
            password: encryptUserPassword,
            phoneNumber
        });
        if (data) {

            const link = `http://${process.env.BASE_URL}/verify/account?userId=${data._id}`
            sendEmail(data.email, "verify your password via this link", link)

        }

        return res.status(201).json({
            message:"email has been send. Plese verify the email",
            message: "you are registered", data
        })
    }
    catch(err) {
        console.log("error", err);
       return res.status(400).json(err)
    }
}

const login = async (req, res, next) => {
    try {

        const { email, password } = req.body
        if (!(email && password)) {
            return res.status(400).send("All inputs are required")
        }
        const data = await Student.findOne({ email })
        if (data && (await bcrypt.compare(password, data.password))) {
            const token = jwt.sign({
                token: data._id, email
            },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "5h",
                })
            data.token = token;
            return res.status(200).json({ data, token })
        }
        return res.status(500).send("Invalid credentials")

    }
    catch (err) {
        console.log("error", err);
        res.json(err)
    }
}

const update = async (req, res, next) => {
    try {
        let findUser = await Student.findById({ _id: req.body._id })
        if (!findUser) {
            return res.status(404).json({
                message: "user not found"
            })
        }
        const { firstName,
            lastName,
            address,
            email,
            phoneNumber } = req.body
        var updateData = {
            firstName,
            lastName,
            address,
            email,
            phoneNumber
        }
        await Student.updateOne({ $set: updateData })
        return res.status(200).json({
            message: "user data updated", updateData
        })
    }
    catch (err) {
        console.log("error", err);
        return res.status(400).json(err)
    }
}
const changePassword = async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body
        if (!(oldPassword && newPassword)) {
            return res.status(403).json({ message: "Please fill up all the required fields  " })
        }

        const data = await Student.findById({ _id: req.body._id })
        if (!data) {
            return res.status(404).json("user does not exist")
        }
        if (data) {

            const match = await bcrypt.compare(oldPassword, data.password)
            if (match) {
                const encryptUser = await bcrypt.hash(newPassword, 10)
                data.password = encryptUser
                data.save()

            } else {
                return res.status(400).json({ message: "you entered wrong old password" })
            }

        }

        return res.status(201).json({ message: "your password changed successfully" })
    }
    catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server error", err,
            statusCode: 500
        })
    }
}



const deleteStudent = async (req, res, next) => {
    try {

       const data =  await Student.findByIdAndDelete(req.params.id)
       if(data){
        return res.status(200).json("user deleted successfully")
        }
        else{
            return res.status(404).json("no data is available")
        }
    }
    catch (err) {
        console.log("error", err);
        res.status(400).json(err)

    }
}

module.exports = {
    register,
    login,
    deleteStudent,
    update,
    changePassword,
    show

}



