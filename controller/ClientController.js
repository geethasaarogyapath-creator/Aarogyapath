const client = require('../models/Client')
const express = require('express')

const register = async (req,res) => {
    try {
        const {name,email,phone,height,weight,proffession,age,gender,address,isvisited} = req.body;
        const t = await client.findOne({email:email})
        if(t){
            res.status(200).json("Already Registered")
        }else{
            const c = new client({
                name,
                email,
                phone,
                height,
                weight,
                gender,
                age,
                proffession,
                address,
                isvisited
            })
            const user = await c.save()
            res.status(200).json("Registered Successfully")
        }
    } catch (error) {
        console.log(error)
        res.status(400).json("Internal Server Error")
    }
    
}

module.exports = {register} 