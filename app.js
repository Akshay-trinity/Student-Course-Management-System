require('dotenv').config();
require('./config/db')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const express = require('express')
const app = express();
const adminRoute = require('./route/adminRoute')
const courseRoute = require('./route/courseRoute')
const studentCourseRoute = require('./route/studentCourseRoute')
const studentRoute = require('./route/studentRoute')
const adminBro = require('./route/adminBro')
const swaggerUiExpress = require('swagger-ui-express')
const swaggerDocs = require('./swagger/TrinityTecholutions-student-course-management-system-0.1-resolved.json')
const port = process.env.PORT

app.use(bodyParser.json())
app.use(morgan('dev'))


app.use('/api/account',adminRoute)
app.use('/api/account/course',courseRoute)
app.use('/api/account/student',studentRoute)
app.use('/api/account/studentCourse',studentCourseRoute)
app.use('/admin',adminBro)
app.use('/swagger',swaggerUiExpress.serve,swaggerUiExpress.setup(swaggerDocs))

app.get('/verify/account',(req,res)=>{
	return res.send("congratulation your registration is successful")
  })

app.listen(port,()=>{
	console.log(`listening the server on the port ${port}`);
})