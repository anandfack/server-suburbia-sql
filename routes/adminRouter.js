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
router.post("/merchandise", upload, adminController.addMerchandise)
router.get("/merchandise/show-image/:id", adminController.showImageMerchandise)
router.get("/merchandise/:id", adminController.showEditMerchandise)
router.put("/merchandise/:id", uploadMultiple, adminController.editMerchandise)
router.delete("/merchandise/:id/delete", adminController.deleteMerchandise)

// endpoint imageMerchandise
// router.get("/image-merchandise", adminController.viewAddImageMerchandise)
router.post("/image-merchandise", upload, adminController.addImageMerchandise)

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

// endpoint artist
router.get("/artist", adminController.viewArtist)
router.post("/artist", upload, adminController.addArtist)
router.put("/artist", upload, adminController.editArtist)
router.delete("/artist/:id", adminController.deleteArtist)

// endpoint gallery
router.get("/gallery", adminController.viewGallery)
router.post("/gallery", uploadMultiple, adminController.addGallery)
router.get("/gallery/show-image/:id", adminController.showImageGallery)
router.get("/gallery/:id", adminController.showEditGallery)
router.put("/gallery/:id", uploadMultiple, adminController.editGallery)
router.delete("/gallery/:id/delete", adminController.deleteGallery)

// endpoint author
router.get("/author", adminController.viewAuthor)
router.post("/author", upload, adminController.addAuthor)
router.put("/author", upload, adminController.editAuthor)
router.delete("/author/:id", adminController.deleteAuthor)

module.exports = router
