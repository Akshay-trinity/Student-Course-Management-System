const mongoose = require('mongoose')
const Schema = mongoose.Schema
const courseSchema = new Schema({
	firstName: {
		type: String
	},
	lastName: {
		type: String
	},
	address: {
		type: String
	},
	email: {
		type: String,
		unique: true
	},
	password: {
		type: String
	},
	phoneNumber: {
		type: Number
	}
}, { timestamps: true })

const Student = mongoose.model('Student', courseSchema)
module.exports = Student