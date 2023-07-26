const {
  Category, 
  Rooster, 
  Merchandise, 
  imageMerchandise,
  News,
  Item,
  Image,
} = require("../models/model")

const path = require("path")
const fs = require("fs-extra")

const viewDashboard = async (req, res) => {
  res.render("admin/dashboard/view_dashboard", {
    title: "Suburbia.east",
  })
}

const viewCategory = async (req, res) => {
  try {
    // query category
    const category = await Category.findAll({
      order: [
        ["name", "ASC"]
      ]
    })

    // notification declare
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }
    
    // send data to view page
    res.render("admin/category/view_category", {
      category,
      alert,
      title: "Suburbia.east | Category",
    })
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/category")
  }
}

const addCategory = async (req, res) => {
  try {
    // get data from body
    const { name } = req.body

    // save data
    await Category.create({
      name,
    })

    // notification and redirect
    req.flash("alertMessage", "Success add category")
    req.flash("alertStatus", "success")
    res.redirect("/admin/category")
  } catch (error) {
    // catch error
    req.flash("errorMessage", `${error.message}`)
    req.flash("error.status", "danger")
    res.redirect("/admin/category")
  }
}

const editCategory = async (req, res) => {
  try {
    // get data from body
    const { id, name } = req.body

    // function query find data by id
    const category = await Category.findOne({
      where: { id: id },
      attributes: ["id", "name"],
    })

    // function update data
    await category.update({
      name: name,
    })

    // notification
    req.flash("alertMessage", "Success update category")
    req.flash("alertStatus", "success")

    // redirect
    res.redirect("/admin/category")
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/category")
  }
}

const deleteCategory = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params

    // functiion delete by id from params
    await Category.destroy({
      where: { id: id },
    })

    // notification
    req.flash("alertMessage", "Success delete category")
    req.flash("alertStatus", "success")

    // redirect
    res.redirect("/admin/category")
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/category")
  }
}

const viewRooster = async (req, res) => {
  try {
    // function query find rooster
    const rooster = await Rooster.findAll({
      order: [
        ["nameBand", "ASC"]
      ]
    })

    // declare notification
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }

    // render data to view pages
    res.render("admin/rooster/view_rooster", {
      title: "Suburbia.east | Rooster",
      rooster,
      alert,
    })
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/rooster")
  }
}

const addRooster = async (req, res) => {
  try {
    // get data from body
    const { nameBand, city, instagram, spotify } = req.body
    
    // function save
    await Rooster.create({
      nameBand,
      city,
      instagram,
      spotify,
      imageUrl: `images/${req.file.filename}`,
    })

    // notification
    req.flash("alertMessage", "Success add rooster")
    req.flash("alertStatus", "success")

    // redirect
    res.redirect("/admin/rooster")
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/rooster")
  }
}

const editRooster = async (req, res) => {
  try {
    // get data from body
    const { id, nameBand, city, instagram, spotify } = req.body
    
    // function find rooster by id
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

    // condition if edit without file
    if (req.file == undefined) {

      // function update without file
      await rooster.update({
        nameBand: nameBand,
        city: city,
        instagram: instagram,
        spotify: spotify,
      })

      // notification
      req.flash("alertMessage", "Success update rooster")
      req.flash("alertStatus", "success")

      // redirect
      res.redirect("/admin/rooster")

      // condition if edit with file
    } else {

      // delete saved image
      await fs.unlink(path.join(`public/${rooster.imageUrl}`))

      // declare value from body
      rooster.nameBand = nameBand
      rooster.city = city
      rooster.instagram = instagram
      rooster.spotify = spotify

      // declare image from body
      rooster.imageUrl = `images/${req.file.filename}`

      // function update
      await rooster.save()

      // notification
      req.flash("alertMessage", "Success update rooster")
      req.flash("alertStatus", "success")

      // redirect
      res.redirect("/admin/rooster")
    }
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("aletStatus", "danger")
    res.redirect("/admin/rooster")
  }
}

const deleteRooster = async (req, res) => {
  try {
    // get data from params
    const { id } = req.params

    // function query find by id
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

    // delete saved image
    await fs.unlink(path.join(`public/${getRoosterId.imageUrl}`))

    // delete value by id
    await Rooster.destroy({
      where: {
        id: id,
      },
    })

    // notification
    req.flash("alertMessage", "Success delete rooster")
    req.flash("alertStatus", "success")

    // redirect
    res.redirect("/admin/rooster")
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/rooster")
  }
}

const viewMerchandise = async (req, res) => {
  try {
    // get merchandise data with relational table
    const merchandise = await Merchandise.findAll({
      order: [
        ["title", "ASC"]
      ],
      include: [
        {
          model: imageMerchandise,
          attributes: ["id", "imageUrl"],
        },
      ],
    })

    // declare notification
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }

    // render data to view pages
    res.render("admin/merchandise/view_merchandise", {
      merchandise,
      alert,
      action: "view",
      title: "Suburbia.east | Merch",
    })
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/merchandise")
  }
}

const showImageMerchandise = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params
    
    // function query find by id with relation table
    const merchandise = await Merchandise.findOne({
      where: { id: id },
      include: { model: imageMerchandise, attributes: ["id", "imageUrl"] },
    })

    // notification
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }
    
    // render data to view page
    res.render("admin/merchandise/view_merchandise", {
      alert,
      merchandise,
      title: "Suburbia.east | Detail Merch",
      action: "show image",
    })
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/merchandise")
  }
}

const addMerchandise = async (req, res) => {
  try {
    // get data from body
    const { title, price, size, shopeeUrl, tokopediaUrl } = req.body
    
    // condition add with image > 1
    if (req.files.length > 0) {

      // declare data for create
      const newMerchandise = {
        title,
        price,
        size,
        shopeeUrl,
        tokopediaUrl,
      }

      // function save
      const merchandise = await Merchandise.create(newMerchandise)

      // looping save image by file length
      for (let i = 0; i < req.files.length; i++) {
        const imageSave = await imageMerchandise.create({
          imageUrl: `images/${req.files[i].filename}`,
        })
        merchandise.addImageMerchandise(imageSave)
      }

      // notification
      req.flash("alertMessage", "Success add merchandise")
      req.flash("alertStatus", "success")

      // redirect
      res.redirect("/admin/merchandise")
    }
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/merchandise")
  }
}

const showEditMerchandise = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params

    // function query find by id with relational table
    const merchandise = await Merchandise.findOne({
      where: { id: id },
      include: { model: imageMerchandise, attributes: ["id", "imageUrl"] },
    })

    // notification
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }

    // render data to view page
    res.render("admin/merchandise/view_merchandise", {
      alert,
      merchandise,
      action: "edit",
      title: "Suburbia.east | Edit merchandise",
    })
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/merchandise")
  }
}

const editMerchandise = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params

    // get data from body
    const { title, price, size, shopeeUrl, tokopediaUrl } = req.body

    // function query find by id with relational table
    const merchandise = await Merchandise.findOne({
      where: { id: id },
      include: {
        model: imageMerchandise,
        attributes: ["id", "imageUrl", "merchandiseId"],
      },
    })

    // condition if edit with with files
    if (req.files.length > 0) {

      // looping by total imageMerchandises from merchandise
      for (let i = 0; i < merchandise.imageMerchandises.length; i++) {

        // function query find by primary key
        const imageUpdate = await imageMerchandise.findByPk(
          merchandise.imageMerchandises[i].id
        )

        // delete saved image
        await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`))

        // save new image
        imageUpdate.imageUrl = `images/${req.files[i].filename}`
        await imageUpdate.save()
      }

      // declare all data on table
      merchandise.title = title
      merchandise.price = price
      merchandise.size = size
      merchandise.shopeeUrl = shopeeUrl
      merchandise.tokopediaUrl = tokopediaUrl
      
      // function save
      await merchandise.save()

      // notification
      req.flash("alertMessage", "Success update merchandise")
      req.flash("alertStatus", "success")

      // redirect
      res.redirect("/admin/merchandise")

      // condition if edit without images
    } else {

      // declare all data on table except image
      merchandise.title = title
      merchandise.price = price
      merchandise.size = size
      merchandise.shopeeUrl = shopeeUrl
      merchandise.tokopediaUrl = tokopediaUrl

      // function save
      await merchandise.save()

      // notification
      req.flash("alertMessage", "Success update merchandise")
      req.flash("alertStatus", "success")

      // redirect
      res.redirect("/admin/merchandise")
    }
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/merchandise")
  }
}

const deleteMerchandise = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params

    // function query find by id with relational table
    const merchandise = await Merchandise.findOne({
      where: { id: id },
      include: {
        model: imageMerchandise,
        attributes: ["id", "imageUrl", "merchandiseId"],
      },
    })

    // looping imageMerchandises length on merchandise
    for (let i = 0; i < merchandise.imageMerchandises.length; i++) {
      
      // function find by pk and delete saved image
      await imageMerchandise
        .findByPk(merchandise.imageMerchandises[i].id)
        .then((imageMerchandise) => {
          fs.unlink(path.join(`public/${imageMerchandise.imageUrl}`))
        })
    }

    // delete value on table
    await merchandise.destroy()

    // notification
    req.flash("alertMessage", "Success delete merchandise")
    req.flash("alertStatus", "success")

    // redirect
    res.redirect("/admin/merchandise")
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/merchandise")
  }
}

const viewNews = async (req, res) => {
  try {
    // function query find all news data
    const news = await News.findAll()

    // declare notification
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }
    
    // render data to view page
    res.render("admin/news/view_news", {
      alert,
      news,
      title: "Suburbia.east | News",
    })
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/news")
  }
}

const addNews = async (req, res) => {
  try {
    // get data from body
    const { title, author, artist, date, about } = req.body

    // function create
    await News.create({
      title,
      author,
      artist,
      date,
      description: about,

      // create with image
      imageUrl: `images/${req.file.filename}`,
    })

    // notification
    req.flash("alertMessage", "Success add news")
    req.flash("alertStatus", "success")

    // redirect
    res.redirect("/admin/news")
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/news")
  }
}

const editNews = async (req, res) => {
  try {
    // get data from body
    const { id, title, author, artist, date, about_edit } = req.body

    // function query find by id
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

    // condition if edit without image
    if (req.file == undefined) {

      // function update
      await news.update({
        title: title,
        author: author,
        artist: artist,
        date: date,
        description: about_edit,
      })

      // notification
      req.flash("alertMessage", "Success update news")
      req.flash("alertStatus", "success")

      // redirect
      res.redirect("/admin/news")

      // condition if edit with image
    } else {

      // delete saved image
      await fs.unlink(path.join(`public/${news.imageUrl}`))
      
      // declare all data include image
      news.title = title
      news.author = author
      news.artist = artist
      news.date = date
      news.description = about_edit
      news.imageUrl = `images/${req.file.filename}`

      // function save
      await news.save()

      // notification
      req.flash("alertMessage", "Success update news")
      req.flash("alertStatus", "success")
      
      // redirect
      res.redirect("/admin/news")
    }
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("aletStatus", "danger")
    res.redirect("/admin/news")
  }
}

const deleteNews = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params
    
    // function query find by id
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

    // delete saved image
    await fs.unlink(path.join(`public/${getNewsId.imageUrl}`))
    
    // delete all data on table
    await News.destroy({
      where: {
        id: id,
      },
    })

    // notification
    req.flash("alertMessage", "Success delete news")
    req.flash("alertStatus", "success")
    
    // redirect
    res.redirect("/admin/news")
  } catch (error) {
    
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/news")
  }
}

const viewItem = async (req, res) => {
  try {
    // function query find all item with relational table
    const item = await Item.findAll({
      order: [
        ["date", "DESC"]
      ],
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

    // function get category for select option
    const category = await Category.findAll()

    // notificiation
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }
    
    // render to view page
    res.render("admin/item/view_item", {
      item,
      alert,
      title: "Suburbia.east | Item",
      action: "view",
      category,
    })
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/item")
  }
}

const addItem = async (req, res) => {
  try {
    // get all data from body
    const { categoryId, title, city, date, startHour, endHour, organizer, about } = req.body
    
    // condition if create with images
    if (req.files.length > 0) {

      // function query find by id
      const category = await Category.findOne({
        where: { id: categoryId },
      })

      // fucntion create
      const newItem = await Item.create({
        categoryId: category.id,
        title,
        city,
        date,
        startHour,
        endHour,
        organizer,
        description: about,
      })
      await category.addItem(newItem)

      // looping for files length
      for (let i = 0; i < req.files.length; i++) {

        // fucntion create images
        const imageSave = await Image.create({
          imageUrl: `images/${req.files[i].filename}`,
        })
        await newItem.addImage(imageSave)
      }

      // notification
      req.flash("alertMessage", "Success add item")
      req.flash("alertStatus", "success")

      // redirect
      res.redirect("/admin/item")
    }
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/item")
  }
}

const showImageItem = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params
    
    // function query find by id with relational table
    const item = await Item.findOne({
      where: { id: id },
      include: { model: Image, attributes: ["id", "imageUrl"] },
    })

    // declare notification
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }
    
    // render to view page
    res.render("admin/item/view_item", {
      alert,
      item,
      title: "Suburbia.east | Detail Item",
      action: "show image",
    })
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/item")
  }
}

const showEditItem = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params
    
    // function query find by id with relational table
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

    // get category for select option
    const category = await Category.findAll()

    // notification
    const alertMessage = req.flash("alertMessage")
    const alertStatus = req.flash("alertStatus")
    const alert = { message: alertMessage, status: alertStatus }
    
    // render to view page
    res.render("admin/item/view_item", {
      alert,
      category,
      item,
      action: "edit",
      title: "Suburbia.east | Edit Item",
    })
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/item")
  }
}

const editItem = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params
    
    // get all data from boyd
    const { categoryId, title, date, startHour, endHour, city, organizer, about } = req.body
    
    // function query find by id with relational table
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

    // condition edit with images
    if (req.files.length > 0) {

      // looping form images length
      for (let i = 0; i < item.Images.length; i++) {
        
        // function find by pk
        const imageUpdate = await Image.findByPk(item.Images[i].id)
        
        // delete saved images
        await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`))
        
        // update with new images
        imageUpdate.imageUrl = `images/${req.files[i].filename}`
        await imageUpdate.save()
      }

      // declare data from body
      item.title = title
      item.date = date
      item.startHour = startHour
      item.endHour = endHour
      item.city = city
      item.organizer = organizer
      item.description = about
      item.categoryId = categoryId

      // function save
      await item.save()

      // notification
      req.flash("alertMessage", "Success edit item")
      req.flash("alertStatus", "success")

      // redirect
      res.redirect("/admin/item")

      // condition if edit without images
    } else {

      // declare data from body
      item.title = title
      item.date = date
      item.startHour = startHour
      item.endHour = endHour
      item.city = city
      item.organizer = organizer
      item.description = about
      item.categoryId = categoryId

      // function save
      await item.save()

      // notification
      req.flash("alertMessage", "Success edit item")
      req.flash("alertStatus", "success")
      
      // redirect
      res.redirect("/admin/item")
    }
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`)
    req.flash("alertStatus", "danger")
    res.redirect("/admin/item")
  }
}

const deleteItem = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params
    
    // function query find by id with relational table
    const item = await Item.findOne({
      where: { id: id },
      include: {
        model: Image,
        attributes: ["id", "imageUrl", "itemId"],
      },
    })

    // looping for images length
    for (let i = 0; i < item.Images.length; i++) {
      
      // function find by pk
      await Image.findByPk(item.Images[i].id).then((image) => {
        
        // delete saved image
        fs.unlink(path.join(`public/${image.imageUrl}`))
      })
    }

    // delete all data on table
    await item.destroy()

    // notification
    req.flash("alertMessage", "Success delete item")
    req.flash("alertStatus", "success")

    // redirect
    res.redirect("/admin/item")
  } catch (error) {
    // catch error
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
