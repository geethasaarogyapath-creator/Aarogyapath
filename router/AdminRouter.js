const express = require('express')
const router = express.Router()
const {getallclients,getsingleclient,vis} = require('../controller/AdminController')

router.get("/getclients",getallclients)
router.get("/single/:id",getsingleclient)

module.exports = router 