const express = require("express")
const router = express.Router()

const apiController = require("../controllers/apiController")

router.get("/landing-page", apiController.landingPage)

module.exports = router
