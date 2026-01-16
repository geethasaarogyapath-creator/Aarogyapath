const express = require('express')
const {register} = require('../controller/ClientController')
const router = express.Router()

router.post('/reg',register)

module.exports = router