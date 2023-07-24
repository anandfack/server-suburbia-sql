const Category = require("../models/model").Category
const Rooster = require("../models/model").Rooster
const Merchandise = require("../models/model").Merchandise
const imageMerchandise = require("../models/model").imageMerchandise
const News = require("../models/model").News
const Item = require("../models/model").Item
const Image = require("../models/model").Image

const path = require("path")
const fs = require("fs-extra")

const viewDashboard = async (req, res) => {
  res.render("admin/dashboard/view_dashboard", {
    title: "Suburbia.east",
  })
}

const viewCategory = async (req, res) => {
  try {
    const category = await Category.findAll()
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }
    res.render("admin/category/view_category", {
      category,
      alert,
      title: "Suburbia.east | Category",
    })
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/category")
  }
}

const addCategory = async (req, res) => {
  try {
    const { name } = req.body
    await Category.create({
      name,
    })
    res.redirect("/admin/category")
  } catch (error) {
    req.flash("errorMessage", `${error.message}`)
    req.flash("error.status", "danger")
    res.redirect("/admin/category")
  }
}

const editCategory = async (req, res) => {
  try {
    const { id, name } = req.body
    const category = await Category.findOne({
      where: { id: id },
      attributes: ["id", "name"],
    })
    await category.update({
      name: name,
    })
    req.flash("alertMessage", "Success update category")
    req.flash("alertStatus", "success")
    res.redirect("/admin/category")
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/category")
  }
}

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params
    await Category.destroy({
      where: { id: id },
    })
    req.flash("alertMessage", "Success delete category")
    req.flash("alertStatus", "success")
    res.redirect("/admin/category")
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/category")
  }
}

const viewRooster = async (req, res) => {
  try {
    const rooster = await Rooster.findAll()
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }
    res.render("admin/rooster/view_rooster", {
      title: "Suburbia.east | Rooster",
      rooster,
      alert,
    })
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/rooster")
  }
}

const addRooster = async (req, res) => {
  try {
    const { nameBand, city, instagram, spotify } = req.body
    await Rooster.create({
      nameBand,
      city,
      instagram,
      spotify,
      imageUrl: `images/${req.file.filename}`,
    })
    req.flash("alertMessage", "Success add rooster")
    req.flash("alertStatus", "success")
    res.redirect("/admin/rooster")
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/rooster")
  }
}

const editRooster = async (req, res) => {
  try {
    const { id, nameBand, city, instagram, spotify } = req.body
    const rooster = await Rooster.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "nameBand",
        "city",
        "instagram",
        "spotify",
        "imageUrl",
      ],
    })
    if (req.file == undefined) {
      await rooster.update({
        nameBand: nameBand,
        city: city,
        instagram: instagram,
        spotify: spotify,
      })
      req.flash("alertMessage", "Success update rooster")
      req.flash("alertStatus", "success")
      res.redirect("/admin/rooster")
    } else {
      await fs.unlink(path.join(`public/${rooster.imageUrl}`))
      rooster.nameBand = nameBand
      rooster.city = city
      rooster.instagram = instagram
      rooster.spotify = spotify
      rooster.imageUrl = `images/${req.file.filename}`
      await rooster.save()
      req.flash("alertMessage", "Success update rooster")
      req.flash("alertStatus", "success")
      res.redirect("/admin/rooster")
    }
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("aletStatus", "danger")
    res.redirect("/admin/rooster")
  }
}

const deleteRooster = async (req, res) => {
  try {
    const { id } = req.params
    const getRoosterId = await Rooster.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "nameBand",
        "city",
        "instagram",
        "spotify",
        "imageUrl",
      ],
    })
    await fs.unlink(path.join(`public/${getRoosterId.imageUrl}`))
    await Rooster.destroy({
      where: {
        id: id,
      },
    })
    req.flash("alertMessage", "Success delete rooster")
    req.flash("alertStatus", "success")
    res.redirect("/admin/rooster")
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/rooster")
  }
}

const viewMerchandise = async (req, res) => {
  try {
    const merchandise = await Merchandise.findAll({
      include: [
        {
          model: imageMerchandise,
          attributes: ["id", "imageUrl"],
        },
      ],
    })
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }
    res.render("admin/merchandise/view_merchandise", {
      merchandise,
      alert,
      action: "view",
      title: "Suburbia.east | Merch",
    })
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/merchandise")
  }
}

const showImageMerchandise = async (req, res) => {
  try {
    const { id } = req.params
    const merchandise = await Merchandise.findOne({
      where: { id: id },
      include: { model: imageMerchandise, attributes: ["id", "imageUrl"] },
    })
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }
    res.render("admin/merchandise/view_merchandise", {
      alert,
      merchandise,
      title: "Suburbia.east | Detail Merch",
      action: "show image",
    })
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/merchandise")
  }
}

const addMerchandise = async (req, res) => {
  try {
    const { title, price, size, shopeeUrl, tokopediaUrl } = req.body
    if (req.files.length > 0) {
      const newMerchandise = {
        title,
        price,
        size,
        shopeeUrl,
        tokopediaUrl,
      }
      const merchandise = await Merchandise.create(newMerchandise)
      for (let i = 0; i < req.files.length; i++) {
        const imageSave = await imageMerchandise.create({
          imageUrl: `images/${req.files[i].filename}`,
        })
        merchandise.addImageMerchandise(imageSave)
      }
      req.flash("alertMessage", "Success add merchandise")
      req.flash("alertStatus", "success")
      res.redirect("/admin/merchandise")
    }
  } catch (error) {
    req.flash("alertMessage", `${error}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/merchandise")
  }
}

const showEditMerchandise = async (req, res) => {
  try {
    const { id } = req.params
    const merchandise = await Merchandise.findOne({
      where: { id: id },
      include: { model: imageMerchandise, attributes: ["id", "imageUrl"] },
    })
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }
    res.render("admin/merchandise/view_merchandise", {
      alert,
      merchandise,
      action: "edit",
      title: "Suburbia.east | Edit merchandise",
    })
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/merchandise")
  }
}

const editMerchandise = async (req, res) => {
  try {
    const { id } = req.params
    const { title, price, size, shopeeUrl, tokopediaUrl } = req.body
    const merchandise = await Merchandise.findOne({
      where: { id: id },
      include: {
        model: imageMerchandise,
        attributes: ["id", "imageUrl", "merchandiseId"],
      },
    })
    if (req.files.length > 0) {
      for (let i = 0; i < merchandise.imageMerchandises.length; i++) {
        const imageUpdate = await imageMerchandise.findByPk(
          merchandise.imageMerchandises[i].id
        )
        await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`))
        imageUpdate.imageUrl = `images/${req.files[i].filename}`
        await imageUpdate.save()
      }
      merchandise.title = title
      merchandise.price = price
      merchandise.size = size
      merchandise.shopeeUrl = shopeeUrl
      merchandise.tokopediaUrl = tokopediaUrl
      await merchandise.save()
      req.flash("alertMessage", "Success update merchandise")
      req.flash("alertStatus", "success")
      res.redirect("/admin/merchandise")
    } else {
      merchandise.title = title
      merchandise.price = price
      merchandise.size = size
      merchandise.shopeeUrl = shopeeUrl
      merchandise.tokopediaUrl = tokopediaUrl
      await merchandise.save()
      req.flash("alertMessage", "Success update merchandise")
      req.flash("alertStatus", "success")
      res.redirect("/admin/merchandise")
    }
  } catch (error) {
    console.log(error)
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/merchandise")
  }
}

const deleteMerchandise = async (req, res) => {
  try {
    const { id } = req.params
    const merchandise = await Merchandise.findOne({
      where: { id: id },
      include: {
        model: imageMerchandise,
        attributes: ["id", "imageUrl", "merchandiseId"],
      },
    })
    for (let i = 0; i < merchandise.imageMerchandises.length; i++) {
      await imageMerchandise
        .findByPk(merchandise.imageMerchandises[i].id)
        .then((imageMerchandise) => {
          fs.unlink(path.join(`public/${imageMerchandise.imageUrl}`))
        })
    }
    await merchandise.destroy()
    req.flash("alertMessage", "Success delete merchandise")
    req.flash("alertStatus", "success")
    res.redirect("/admin/merchandise")
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/merchandise")
  }
}

const viewNews = async (req, res) => {
  try {
    const news = await News.findAll()
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }
    res.render("admin/news/view_news", {
      alert,
      news,
      title: "Suburbia.east | News",
    })
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
  }
}

const addNews = async (req, res) => {
  try {
    const { title, author, artist, date, about } = req.body
    await News.create({
      title,
      author,
      artist,
      date,
      description: about,
      imageUrl: `images/${req.file.filename}`,
    })
    req.flash("alertMessage", "Success add news")
    req.flash("alertStatus", "success")
    res.redirect("/admin/news")
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/news")
  }
}

const editNews = async (req, res) => {
  try {
    const { id, title, author, artist, date, about_edit } = req.body
    const news = await News.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "title",
        "author",
        "artist",
        "date",
        "description",
        "imageUrl",
      ],
    })
    if (req.file == undefined) {
      await news.update({
        title: title,
        author: author,
        artist: artist,
        date: date,
        description: about_edit,
      })
      req.flash("alertMessage", "Success update news")
      req.flash("alertStatus", "success")
      res.redirect("/admin/news")
    } else {
      await fs.unlink(path.join(`public/${news.imageUrl}`))
      news.title = title
      news.author = author
      news.artist = artist
      news.date = date
      news.description = about_edit
      news.imageUrl = `images/${req.file.filename}`
      await news.save()
      req.flash("alertMessage", "Success update news")
      req.flash("alertStatus", "success")
      res.redirect("/admin/news")
    }
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("aletStatus", "danger")
    res.redirect("/admin/news")
  }
}

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params
    const getNewsId = await News.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "title",
        "author",
        "artist",
        "date",
        "description",
        "imageUrl",
      ],
    })
    await fs.unlink(path.join(`public/${getNewsId.imageUrl}`))
    await News.destroy({
      where: {
        id: id,
      },
    })
    req.flash("alertMessage", "Success delete news")
    req.flash("alertStatus", "success")
    res.redirect("/admin/news")
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/news")
  }
}

const viewItem = async (req, res) => {
  try {
    const item = await Item.findAll({
      include: [
        {
          model: Image,
          attributes: ["id", "imageUrl"],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    })
    const category = await Category.findAll()
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }
    res.render("admin/item/view_item", {
      item,
      alert,
      title: "Suburbia.east | Item",
      action: "view",
      category,
    })
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/item")
  }
}

const addItem = async (req, res) => {
  try {
    const { categoryId, title, city, date, organizer, about } = req.body
    if (req.files.length > 0) {
      const category = await Category.findOne({
        where: { id: categoryId },
      })
      const newItem = await Item.create({
        categoryId: category.id,
        title,
        city,
        date,
        organizer,
        description: about,
      })
      await category.addItem(newItem)
      for (let i = 0; i < req.files.length; i++) {
        const imageSave = await Image.create({
          imageUrl: `images/${req.files[i].filename}`,
        })
        await newItem.addImage(imageSave)
      }
      req.flash("alertMessage", "Success add item")
      req.flash("alertStatus", "success")
      res.redirect("/admin/item")
    }
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/item")
  }
}

const showImageItem = async (req, res) => {
  try {
    const { id } = req.params
    const item = await Item.findOne({
      where: { id: id },
      include: { model: Image, attributes: ["id", "imageUrl"] },
    })
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }
    res.render("admin/item/view_item", {
      alert,
      item,
      title: "Suburbia.east | Detail Item",
      action: "show image",
    })
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/item")
  }
}

const showEditItem = async (req, res) => {
  try {
    const { id } = req.params
    const item = await Item.findOne({
      where: { id: id },
      include: [
        {
          model: Image,
          attributes: ["id", "imageUrl"],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    })
    const category = await Category.findAll()
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }
    res.render("admin/item/view_item", {
      alert,
      category,
      item,
      action: "edit",
      title: "Suburbia.east | Edit Item",
    })
  } catch (error) {
    req.flash("alertMessage", `${error}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/item")
  }
}

const editItem = async (req, res) => {
  try {
    const { id } = req.params
    const { categoryId, title, date, city, organizer, about } = req.body
    const item = await Item.findOne({
      where: { id: id },
      include: [
        {
          model: Image,
          attributes: ["id", "imageUrl"],
        },
        {
          model: Category,
          attributes: ["id", "name"],
        },
      ],
    })
    if (req.files.length > 0) {
      for (let i = 0; i < item.Images.length; i++) {
        const imageUpdate = await Image.findByPk(item.Images[i].id)
        await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`))
        imageUpdate.imageUrl = `images/${req.files[i].filename}`
        await imageUpdate.save()
      }
      item.title = title
      item.date = date
      item.city = city
      item.organizer = organizer
      item.description = about
      item.categoryId = categoryId
      await item.save()
      req.flash("alertMessage", "Success edit item")
      req.flash("alertStatus", "success")
      res.redirect("/admin/item")
    } else {
      item.title = title
      item.date = date
      item.city = city
      item.organizer = organizer
      item.description = about
      item.categoryId = categoryId
      await item.save()
      req.flash("alertMessage", "Success edit item")
      req.flash("alertStatus", "success")
      res.redirect("/admin/item")
    }
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/item")
  }
}

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params
    const item = await Item.findOne({
      where: { id: id },
      include: {
        model: Image,
        attributes: ["id", "imageUrl", "itemId"],
      },
    })
    for (let i = 0; i < item.Images.length; i++) {
      await Image.findByPk(item.Images[i].id).then((image) => {
        fs.unlink(path.join(`public/${image.imageUrl}`))
      })
    }
    await item.destroy()
    req.flash("alertMessage", "Success delete item")
    req.flash("alertStatus", "success")
    res.redirect("/admin/item")
  } catch (error) {
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/item")
  }
}

module.exports = {
  viewDashboard,
  viewCategory,
  addCategory,
  editCategory,
  deleteCategory,
  viewRooster,
  addRooster,
  editRooster,
  deleteRooster,
  viewMerchandise,
  addMerchandise,
  showImageMerchandise,
  showEditMerchandise,
  editMerchandise,
  deleteMerchandise,
  viewNews,
  addNews,
  editNews,
  deleteNews,
  viewItem,
  addItem,
  showImageItem,
  showEditItem,
  editItem,
  deleteItem,
}
