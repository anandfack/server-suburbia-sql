const express = require("express");
const router = express.Router();

const apiController = require("../controllers/apiController");

router.get("/landing-page", apiController.landingPage);
router.get("/news-page", apiController.newsPage);
router.get("/news-page/:slug", apiController.detailNewsPage);
router.get("/roaster-page", apiController.roasterPage);
router.get("/roaster-page/:slug", apiController.detailRoasterPage);
router.get("/limited-roaster-page", apiController.limitedRoasterPage);
router.get("/merchandise-page/:slug", apiController.detailMerchandise);
router.get("/recent-show-page", apiController.recentShowPage);
router.get("/recent-show-page/:slug", apiController.detailShowPage);
router.get("/author-page/:slug", apiController.detailAuthorPage);

module.exports = router;
