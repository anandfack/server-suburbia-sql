const express = require("express")
const router = express.Router()

const apiController = require("../controllers/apiController")

router.get("/category", apiController.landingPage)

module.exports = router
