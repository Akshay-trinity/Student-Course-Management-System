const mongoose = require('mongoose')
const url = process.env.URL
mongoose.connect(url)
.then(()=>{
    console.log("connected to database");
}).catch((err)=>{
    console.log(`error found in database connection. \n${err}`);
})