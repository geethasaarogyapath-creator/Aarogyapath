const jwt = require('jsonwebtoken')
const admin = require('../models/Admin')
require('dotenv').config()

const verifyToken = async(req, res, next) => {
    const secretkey = process.env.JWT_SECRET;
    const token = req.headers.token
    if(!token){
        return res.status(400).json("Token is required")
    }
    try {
        const decodded = jwt.verify(token,secretkey)
        const admin1 = await admin.findById(decodded.id)
        if(!admin1){
            return res.status(404).json("Admin not Found")
        }
        req.id = admin1._id;
        req.valid = true;
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).json(error)
    }
}

module.exports = verifyToken;