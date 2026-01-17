const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/verifyToken')
const {getallclients,getsingleclient,delsingleclient,reg,login} = require('../controller/AdminController')

router.get("/getclients",verifyToken,getallclients)
router.get("/single/:id",verifyToken,getsingleclient)
router.get("/delete/:id",verifyToken,delsingleclient)
router.post("/reg",reg)
router.post("/login",login)

module.exports = router 