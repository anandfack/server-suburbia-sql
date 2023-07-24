// express
const express = require("express")
const router = express.Router()

// multer
const { upload, uploadMultiple } = require("../middlewares/multer")

// admin controller
const adminController = require("../controllers/adminController")

// router

// endpoint category
router.get("/", adminController.viewDashboard)
router.get("/category", adminController.viewCategory)
router.post("/category", adminController.addCategory)
router.put("/category", adminController.editCategory)
router.delete("/category/:id", adminController.deleteCategory)

// endpoint rooster
router.get("/rooster", adminController.viewRooster)
router.post("/rooster", upload, adminController.addRooster)
router.put("/rooster", upload, adminController.editRooster)
router.delete("/rooster/:id", adminController.deleteRooster)

// endpoint merchandise
router.get("/merchandise", adminController.viewMerchandise)
router.post("/merchandise", uploadMultiple, adminController.addMerchandise)
router.get("/merchandise/show-image/:id", adminController.showImageMerchandise)
router.get("/merchandise/:id", adminController.showEditMerchandise)
router.put("/merchandise/:id", uploadMultiple, adminController.editMerchandise)
router.delete("/merchandise/:id/delete", adminController.deleteMerchandise)

// endpoint news
router.get("/news", adminController.viewNews)
router.post("/news", upload, adminController.addNews)
router.put("/news", upload, adminController.editNews)
router.delete("/news/:id", adminController.deleteNews)

// endpoint item
router.get("/item", adminController.viewItem)
router.post("/item", uploadMultiple, adminController.addItem)
router.get("/item/show-image/:id", adminController.showImageItem)
router.get("/item/:id", adminController.showEditItem)
router.put("/item/:id", uploadMultiple, adminController.editItem)
router.delete("/item/:id/delete", adminController.deleteItem)

module.exports = router
