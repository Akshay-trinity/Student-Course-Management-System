const Admin = require("../model/adminModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const register = async (req, res, next) => {
    try {

        const { name, email, password } = req.body
        if (!(name && email && password)) {
            return res.status(400).send("All inputs are required")
        }
         if(name !='admin'){
             return res.status(400).json("only admin have authority to register")
         }



        const existingUser = await Admin.findOne({ email })
        if (existingUser) {
            return res.status(400).send("user is already exist.Please login")
        }
        else{
             const encryptUserPassword = await bcrypt.hash(password, 10)
             const data = await Admin.create({
             name: name,
             email: email.toLowerCase(),
             password: encryptUserPassword
            });
            
             return res.status(201).json({
             message: "you are registered", data
            })
        } 
    }
    catch (err) {
        console.log("error", err);
        return res.json(err)
    }
}
const login = async (req, res, next) => {
    try {

        const { email, password } = req.body
        if (!(email && password)) {
           return  res.status(400).send("All inputs are required")
        }
        const data = await Admin.findOne({ email })
        if (data && (await bcrypt.compare(password, data.password))) {
            const token = jwt.sign({
                data_id: data._id, email
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

 const  update = async (req, res, next) => {
    try {
        let findUser = await Admin.findById({ _id: req.body._id})
        if (!findUser) {
            return res.status(404).json({
                message: "user not found"
            })
        }
        var updateData = {
            name: req.body.name,
            password: req.body.password
        }
        await Admin.updateOne({ $set: updateData })
        return res.json({
            message: "user data updated", updateData
        })
    }
    catch {
        console.log("error", err);
        return res.status(400).json(err)
    }
}
const deleteUser = async (req, res, next) => {
    try {
            await Admin.findByIdAndDelete(req.params.id)
            return res.status(200).json("user deleted successfully")
    }
    catch (err) {
        console.log("error", err);
        res.status(400).json(err)
    }
}
module.exports = {
    register,
    login,
    deleteUser,
    update
}



