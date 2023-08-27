const express = require("express")
const router = express.Router()

const apiController = require("../controllers/apiController")

router.get("/landing-page", apiController.landingPage)
router.get("/news-page", apiController.newsPage)
router.get("/news-page/:id", apiController.detailNewsPage)

module.exports = router
