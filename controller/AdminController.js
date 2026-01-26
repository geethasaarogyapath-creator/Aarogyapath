const express = require('express')
const mongoose = require('mongoose')
const Client = require('../models/Client')
const Admin = require('../models/Admin')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const getallclients = async (req, res) => {
    try {
        const clients = await Client.find()
        res.status(200).json(clients)
    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}

// Get single client and mark visited
const getsingleclient = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("Invalid Client ID")
        }

        const client1 = await Client.findById(id)

        if (!client1) {
            return res.status(404).json("Client not Found")
        }

        client1.isvisited = true
        await client1.save()

        res.status(200).json(client1)

    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}

const delsingleclient = async (req, res) => {
    try {
        const { id } = req.params

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json("Invalid Client ID")
        }

        const client1 = await Client.findByIdAndDelete(id)

        if (!client1) {
            return res.status(404).json("Client not Found")
        }

        res.status(200).json(`${client1.name} deleted successfully`)

    } catch (error) {
        console.log(error)
        res.status(500).json("Internal Server Error")
    }
}

const reg = async (req, res) => {
//     try {
//         const { name, email, password } = req.body

//         if (!name || !email || !password) {
//             return res.status(400).json("All fields are required")
//         }

//         const existingAdmin = await Admin.findOne({ email })
//         if (existingAdmin) {
//             return res.status(409).json("Email already exists")
//         }

//         const hashedPassword = await bcrypt.hash(password, 10)

//         const admin1 = new Admin({
//             name,
//             email,
//             password: hashedPassword
//         })

//         await admin1.save()
//         res.status(201).json("Registered successfully")

//     } catch (error) {
//         console.log(error)
//         res.status(500).json("Internal Server Error")
//     }
}

const login = async (req, res) => {
    try {
        const { name, password } = req.body

        if (!name || !password) {
            return res.status(400).json({"mssg":"Invalid Username or Password"})
        }

        const admin1 = await Admin.findOne({ name:name })
        if (!admin1) {
            return res.status(401).json({"mssg":"Invalid Username or Password"})
        } 

        const isMatch = await bcrypt.compare(password, admin1.password)
        if (!isMatch) {
            return res.status(401).json({"mssg":"Invalid Username or Password"})
        }

        const secretkey = process.env.JWT_SECRET
        const token = jwt.sign(
            { id: admin1._id, email: admin1.email },
            secretkey,
        )

        res.status(200).json({
            message: "Login Success",
            token: token
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({"mssg":"Internal Server Error"})
    }
}

module.exports = {
    getallclients,
    getsingleclient,
    delsingleclient,
    reg,
    login
}
