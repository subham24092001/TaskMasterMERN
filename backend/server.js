const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const  session = require('express-session')
require('dotenv').config()

const routes = require('./routes/Taskroutes.js')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT | 3000

//connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("Connection Successfully"))
.catch((e)=>console.log(e))

// middleware
app.use(express.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cookieParser())
// Initialize express-session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { 
    path: '/',
    secure: 'auto', // If you're serving site over HTTPS set it to true, or 'auto' to adapt based on connection type
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000 // 24 hours for example
  }
}));
app.use(cors())
app.use("/api",routes)


app.listen(PORT,()=>{
  console.log(`Server is listening at : http://localhost:${PORT}`)
})
