const express = require("express")
const mongoose = require('mongoose')
const clientrouter = require('./router/ClientRouter')
const adminrouter = require('./router/AdminRouter')
const app = express()
const cors = require('cors')
require('dotenv').config()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req,res,next)=>{
    console.log(req.method,req.path);
    next()
})


app.get("/",(req,res)=>{
    res.send("<p>HI its Backend</p>")
})

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'https://aarogyapath-frontend-admin.vercel.app/'
];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));


app.use("/client",clientrouter);
app.use("/admin",adminrouter)


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("Mongo Connected and App Started")
    })
})
.catch((error)=>{
    console.log(error)
})