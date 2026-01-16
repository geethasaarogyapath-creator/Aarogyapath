const express = require('express')
const client = require('../models/Client')

const getallclients = async (req,res) => {
    try {
        const clients = await client.find()
        res.status(200).json(clients)
    } catch (error) {
        console.log(error)
        res.status(400).json("Internal Server Error")
    }
    
}

const getsingleclient = async (req,res) => {
    try {
        const id = req.params.id;
        const client1 = await client.findById(id);
        if(client1){
            client1.isvisited = true
            await client1.save()
            res.status(200).json([client1])
        }else{
            res.status(200).json("Client not Found")
        }
    } catch (error) {
        console.log(error)
        res.status(400).json("Internal Server Error")
    }
}


module.exports = {getallclients,getsingleclient}