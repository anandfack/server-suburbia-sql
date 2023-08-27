const {
  Category,
  Rooster,
  Merchandise,
  imageMerchandise,
  News,
  Item,
  Image,
  Gallery,
  imageGallery,
  Artist,
  Author,
} = require("../models/model");

const path = require("path");
const fs = require("fs-extra");

/* Dashboard */

const viewDashboard = async (req, res) => {
  res.render("admin/dashboard/view_dashboard", {
    title: "Suburbia.east",
  });
};

/* Category */

const viewCategory = async (req, res) => {
  try {
    // query category
    const category = await Category.findAll({
      order: [["name", "ASC"]],
    });

    // notification declare
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // send data to view page
    res.render("admin/category/view_category", {
      category,
      alert,
      title: "Suburbia.east | Category",
    });
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/category");
  }
};

const addCategory = async (req, res) => {
  try {
    // get data from body
    const { name } = req.body;

    // save data
    await Category.create({
      name,
    });

    // notification and redirect
    req.flash("alertMessage", "Success add category");
    req.flash("alertStatus", "success");
    res.redirect("/admin/category");
  } catch (error) {
    // catch error
    req.flash("errorMessage", `${error.message}`);
    req.flash("error.status", "danger");
    res.redirect("/admin/category");
  }
};

const editCategory = async (req, res) => {
  try {
    // get data from body
    const { id, name } = req.body;

    // function query find data by id
    const category = await Category.findOne({
      where: { id: id },
      attributes: ["id", "name"],
    });

    // function update data
    await category.update({
      name: name,
    });

    // notification
    req.flash("alertMessage", "Success update category");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect("/admin/category");
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/category");
  }
};

const deleteCategory = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;

    // functiion delete by id from params
    await Category.destroy({
      where: { id: id },
    });

    // notification
    req.flash("alertMessage", "Success delete category");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect("/admin/category");
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/category");
  }
};

/* Roaster */

const viewRooster = async (req, res) => {
  try {
    // function query find rooster
    const rooster = await Rooster.findAll({
      order: [["nameBand", "ASC"]],
    });

    // declare notification
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // render data to view pages
    res.render("admin/rooster/view_rooster", {
      title: "Suburbia.east | Rooster",
      rooster,
      alert,
    });
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/rooster");
  }
};

const addRooster = async (req, res) => {
  try {
    // get data from body
    const { nameBand, city, genre, instagram, spotify } = req.body;

    // function save
    await Rooster.create({
      nameBand,
      city,
      genre,
      instagram,
      spotify,
      imageUrl: `images/${req.file.filename}`,
    });

    // notification
    req.flash("alertMessage", "Success add rooster");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect("/admin/rooster");
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/rooster");
  }
};

const editRooster = async (req, res) => {
  try {
    // get data from body
    const { id, nameBand, city, genre, instagram, spotify } = req.body;

    // function find rooster by id
    const rooster = await Rooster.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "nameBand",
        "city",
        "genre",
        "instagram",
        "spotify",
        "imageUrl",
      ],
    });

    // condition if edit without file
    if (req.file == undefined) {
      // function update without file
      await rooster.update({
        nameBand: nameBand,
        city: city,
        genre: genre,
        instagram: instagram,
        spotify: spotify,
      });

      // notification
      req.flash("alertMessage", "Success update rooster");
      req.flash("alertStatus", "success");

      // redirect
      res.redirect("/admin/rooster");

      // condition if edit with file
    } else {
      // delete saved image
      await fs.unlink(path.join(`public/${rooster.imageUrl}`));

      // declare value from body
      rooster.nameBand = nameBand;
      rooster.city = city;
      rooster.genre = genre;
      rooster.instagram = instagram;
      rooster.spotify = spotify;

      // declare image from body
      rooster.imageUrl = `images/${req.file.filename}`;

      // function update
      await rooster.save();

      // notification
      req.flash("alertMessage", "Success update rooster");
      req.flash("alertStatus", "success");

      // redirect
      res.redirect("/admin/rooster");
    }
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("aletStatus", "danger");
    res.redirect("/admin/rooster");
  }
};

const deleteRooster = async (req, res) => {
  try {
    // get data from params
    const { id } = req.params;

    // function query find by id
    const getRoosterId = await Rooster.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "nameBand",
        "city",
        "genre",
        "instagram",
        "spotify",
        "imageUrl",
      ],
    });

    // delete saved image
    await fs.unlink(path.join(`public/${getRoosterId.imageUrl}`));

    // delete value by id
    await Rooster.destroy({
      where: {
        id: id,
      },
    });

    // notification
    req.flash("alertMessage", "Success delete rooster");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect("/admin/rooster");
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/rooster");
  }
};

/* Merchandise */

const viewMerchandise = async (req, res) => {
  try {
    // get merchandise data with relational table
    const merchandise = await Merchandise.findAll({
      order: [["title", "ASC"]],
      include: [
        {
          model: imageMerchandise,
          attributes: ["id", "imageUrl"],
        },
      ],
    });

    const allImage = await imageMerchandise.findAll();

    const selectMerchandise = await Merchandise.findAll();

    // declare notification
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // render data to view pages
    res.render("admin/merchandise/view_merchandise", {
      merchandise,
      allImage,
      selectMerchandise,
      alert,
      action: "view",
      title: "Suburbia.east | Merch",
    });
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/merchandise");
  }
};

const showImageMerchandise = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;

    // function query find by id with relation table
    const merchandise = await Merchandise.findOne({
      where: { id: id },
      include: {
        model: imageMerchandise,
        attributes: ["id", "imageUrl", "isDefault"],
      },
    });

    // notification
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // render data to view page
    res.render("admin/merchandise/view_merchandise", {
      alert,
      merchandise,
      title: "Suburbia.east | Detail Merch",
      action: "show image",
    });
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/merchandise");
  }
};

const addMerchandise = async (req, res) => {
  try {
    // get data from body
    const { title, price, size, shopeeUrl, tokopediaUrl } = req.body;

    // console.log (title)

    // function save
    await Merchandise.create({
      title,
      price,
      size,
      shopeeUrl,
      tokopediaUrl,
    });
    // notification
    req.flash("alertMessage", "Success add merchandise");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect("/admin/merchandise");
  } catch (error) {
    // catch error
    console.log(error);
    req.flash("alertMessage", error.message);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/merchandise");
  }
};

const showEditMerchandise = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;

    // function query find by id with relational table
    const merchandise = await Merchandise.findOne({
      where: { id: id },
      include: { model: imageMerchandise, attributes: ["id", "imageUrl"] },
    });

    // notification
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // render data to view page
    res.render("admin/merchandise/view_merchandise", {
      alert,
      merchandise,
      action: "edit",
      title: "Suburbia.east | Edit merchandise",
    });
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/merchandise");
  }
};

const editMerchandise = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;

    // get data from body
    const { title, price, size, shopeeUrl, tokopediaUrl, isSold } = req.body;

    // function query find by id with relational table
    const merchandise = await Merchandise.findOne({
      where: { id: id },
      include: {
        model: imageMerchandise,
        attributes: ["id", "imageUrl", "merchandiseId"],
      },
    });

    // condition if edit with with files
    if (req.files.length > 0) {
      // looping by total imageMerchandises from merchandise
      for (let i = 0; i < merchandise.imageMerchandises.length; i++) {
        // function query find by primary key
        const imageUpdate = await imageMerchandise.findByPk(
          merchandise.imageMerchandises[i].id
        );

        // delete saved image
        await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));

        // save new image
        imageUpdate.imageUrl = `images/${req.files[i].filename}`;
        await imageUpdate.save();
      }

      // declare all data on table
      merchandise.title = title;
      merchandise.price = price;
      merchandise.size = size;
      merchandise.shopeeUrl = shopeeUrl;
      merchandise.tokopediaUrl = tokopediaUrl;
      merchandise.isSold = isSold;

      // function save
      await merchandise.save();

      // notification
      req.flash("alertMessage", "Success update merchandise");
      req.flash("alertStatus", "success");

      // redirect
      res.redirect("/admin/merchandise");

      // condition if edit without images
    } else {
      // declare all data on table except image
      merchandise.title = title;
      merchandise.price = price;
      merchandise.size = size;
      merchandise.shopeeUrl = shopeeUrl;
      merchandise.tokopediaUrl = tokopediaUrl;
      merchandise.isSold = isSold;

      // function save
      await merchandise.save();

      // notification
      req.flash("alertMessage", "Success update merchandise");
      req.flash("alertStatus", "success");

      // redirect
      res.redirect("/admin/merchandise");
    }
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/merchandise");
  }
};

const deleteMerchandise = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;

    // function query find by id with relational table
    const merchandise = await Merchandise.findOne({
      where: { id: id },
      include: {
        model: imageMerchandise,
        attributes: ["id", "imageUrl", "merchandiseId"],
      },
    });

    // looping imageMerchandises length on merchandise
    for (let i = 0; i < merchandise.imageMerchandises.length; i++) {
      // function find by pk and delete saved image
      await imageMerchandise
        .findByPk(merchandise.imageMerchandises[i].id)
        .then((imageMerchandise) => {
          fs.unlink(path.join(`public/${imageMerchandise.imageUrl}`));
        });
    }

    // delete value on table
    await merchandise.destroy();

    // notification
    req.flash("alertMessage", "Success delete merchandise");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect("/admin/merchandise");
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/merchandise");
  }
};

const addImageMerchandise = async (req, res) => {
  try {
    const { isDefault, merchandiseId } = req.body;

    // function save
    await imageMerchandise.create({
      merchandiseId,
      isDefault,
      imageUrl: `images/${req.file.filename}`,
    });

    // notification
    req.flash("alertMessage", "Success add image-merchandise");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect("/admin/merchandise");
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/merchandise");
  }
};

/* News */

const viewNews = async (req, res) => {
  try {
    // function query find all news data
    const news = await News.findAll({
      attributes: ["id", "title", "artist", "date", "description", "type", "imageUrl"],
      include: {
        model: Author,
      }
    });
    
    const author = await Author.findAll();

    // declare notification
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // render data to view page
    res.render("admin/news/view_news", {
      alert,
      news,
      title: "Suburbia.east | News",
      author,
    });
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/news");
  }
};

const addNews = async (req, res) => {
  try {
    // get data from body
    const { title, artist, date, about, type, authorId } = req.body;

    // function create
    await News.create({
      title,
      artist,
      date,
      type,
      authorId,
      description: about,

      // create with image
      imageUrl: `images/${req.file.filename}`,
    });

    // notification
    req.flash("alertMessage", "Success add news");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect("/admin/news");
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/news");
  }
};

const editNews = async (req, res) => {
  try {
    // get data from body
    const { id, title, artist, date, type, about_news, authorId } =
      req.body;

    // function query find by id
    const news = await News.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "title",
        "artist",
        "date",
        "type",
        "description",
        "authorId",
        "imageUrl",
      ],
      include: [
        {
          model: Author,
          attributes: ["id", "firstName", "lastName", "profilePhoto"],
        },
      ],
    });

    // condition if edit without image
    if (req.file == undefined) {
      // function update
      await news.update({
        title: title,
        artist: artist,
        date: date,
        type: type,
        description: about_news,
        authorId: authorId,
      });

      // notification
      req.flash("alertMessage", "Success update news");
      req.flash("alertStatus", "success");

      // redirect
      res.redirect("/admin/news");

      // condition if edit with image
    } else {
      // delete saved image
      await fs.unlink(path.join(`public/${news.imageUrl}`));

      // declare all data include image
      news.title = title;
      news.artist = artist;
      news.date = date;
      news.type = type;
      news.description = about;
      news.authorId = authorId;
      news.imageUrl = `images/${req.file.filename}`;

      // function save
      await news.save();

      // notification
      req.flash("alertMessage", "Success update news");
      req.flash("alertStatus", "success");

      // redirect
      res.redirect("/admin/news");
    }
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("aletStatus", "danger");
    res.redirect("/admin/news");
  }
};

const deleteNews = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;

    // function query find by id
    const getNewsId = await News.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "title",
        "artist",
        "date",
        "type",
        "description",
        "imageUrl",
      ],
    });

    // delete saved image
    await fs.unlink(path.join(`public/${getNewsId.imageUrl}`));

    // delete all data on table
    await News.destroy({
      where: {
        id: id,
      },
    });

    // notification
    req.flash("alertMessage", "Success delete news");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect("/admin/news");
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/news");
  }
};

/* Item */

const viewItem = async (req, res) => {
  try {
    // function query find all item with relational table
    const item = await Item.findAll({
      order: [["date", "DESC"]],
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
    });

    // function get category for select option
    const category = await Category.findAll();

    // notificiation
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // render to view page
    res.render("admin/item/view_item", {
      item,
      alert,
      title: "Suburbia.east | Item",
      action: "view",
      category,
    });
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/item");
  }
};

const addItem = async (req, res) => {
  try {
    // get all data from body
    const {
      categoryId,
      title,
      city,
      date,
      startHour,
      endHour,
      organizer,
      about,
      artist,
      location,
    } = req.body;

    // condition if create with images
    if (req.files.length > 0) {
      // function query find by id
      const category = await Category.findOne({
        where: { id: categoryId },
      });

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
        artist,
        location,
      });
      await category.addItem(newItem);

      // looping for files length
      for (let i = 0; i < req.files.length; i++) {
        // fucntion create images
        const imageSave = await Image.create({
          imageUrl: `images/${req.files[i].filename}`,
        });
        await newItem.addImage(imageSave);
      }

      // notification
      req.flash("alertMessage", "Success add item");
      req.flash("alertStatus", "success");

      // redirect
      res.redirect("/admin/item");
    }
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/item");
  }
};

const showImageItem = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;

    // function query find by id with relational table
    const item = await Item.findOne({
      where: { id: id },
      include: { model: Image, attributes: ["id", "imageUrl"] },
    });

    // declare notification
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // render to view page
    res.render("admin/item/view_item", {
      alert,
      item,
      title: "Suburbia.east | Detail Item",
      action: "show image",
    });
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/item");
  }
};

const showEditItem = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;

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
    });

    // get category for select option
    const category = await Category.findAll();

    // notification
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // render to view page
    res.render("admin/item/view_item", {
      alert,
      category,
      item,
      action: "edit",
      title: "Suburbia.east | Edit Item",
    });
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/item");
  }
};

const editItem = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;

    // get all data from boyd
    const {
      categoryId,
      title,
      date,
      startHour,
      endHour,
      city,
      organizer,
      about,
      artist,
      location,
    } = req.body;

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
    });

    // condition edit with images
    if (req.files.length > 0) {
      // looping form images length
      for (let i = 0; i < item.Images.length; i++) {
        // function find by pk
        const imageUpdate = await Image.findByPk(item.Images[i].id);

        // delete saved images
        await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));

        // update with new images
        imageUpdate.imageUrl = `images/${req.files[i].filename}`;
        await imageUpdate.save();
      }

      // declare data from body
      item.title = title;
      item.date = date;
      item.startHour = startHour;
      item.endHour = endHour;
      item.city = city;
      item.organizer = organizer;
      item.description = about;
      item.categoryId = categoryId;
      item.artist = artist;
      item.location = location;

      // function save
      await item.save();

      // notification
      req.flash("alertMessage", "Success edit item");
      req.flash("alertStatus", "success");

      // redirect
      res.redirect("/admin/item");

      // condition if edit without images
    } else {
      // declare data from body
      item.title = title;
      item.date = date;
      item.startHour = startHour;
      item.endHour = endHour;
      item.city = city;
      item.organizer = organizer;
      item.description = about;
      item.categoryId = categoryId;
      item.artist = artist;
      item.location = location;

      // function save
      await item.save();

      // notification
      req.flash("alertMessage", "Success edit item");
      req.flash("alertStatus", "success");

      // redirect
      res.redirect("/admin/item");
    }
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/item");
  }
};

const deleteItem = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;

    // function query find by id with relational table
    const item = await Item.findOne({
      where: { id: id },
      include: {
        model: Image,
        attributes: ["id", "imageUrl", "itemId"],
      },
    });

    // looping for images length
    for (let i = 0; i < item.Images.length; i++) {
      // function find by pk
      await Image.findByPk(item.Images[i].id).then((image) => {
        // delete saved image
        fs.unlink(path.join(`public/${image.imageUrl}`));
      });
    }

    // delete all data on table
    await item.destroy();

    // notification
    req.flash("alertMessage", "Success delete item");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect("/admin/item");
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/item");
  }
};

/* Gallery */

const viewGallery = async (req, res) => {
  try {
    // function query find all item with relational table
    const gallery = await Gallery.findAll({
      include: [
        {
          model: Artist,
          attributes: ["id", "firstName", "lastName"],
        },
      ],
    });

    // function get artist for select option
    const artist = await Artist.findAll();

    // notificiation
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // render to view page
    res.render("admin/gallery/view_gallery", {
      gallery,
      alert,
      title: "Suburbia.east | Gallery",
      action: "view",
      artist,
    });
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/gallery");
  }
};

const addGallery = async (req, res) => {
  try {
    // get all data from body
    const { artistId, type } = req.body;

    // condition if create with images
    if (req.files.length > 0) {
      // function query find by id
      const artist = await Artist.findOne({
        where: { id: artistId },
      });

      // fucntion create
      const newGallery = await Gallery.create({
        artistId: artist.id,
        type,
      });
      await artist.addGallery(newGallery);

      // looping for files length
      for (let i = 0; i < req.files.length; i++) {
        // fucntion create images
        const imageSave = await imageGallery.create({
          imageUrl: `images/${req.files[i].filename}`,
        });
        await newGallery.addImageGallery(imageSave);
      }

      // notification
      req.flash("alertMessage", "Success add item");
      req.flash("alertStatus", "success");

      // redirect
      res.redirect("/admin/gallery");
    }
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/gallery");
  }
};

const showImageGallery = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;

    // function query find by id with relational table
    const gallery = await Gallery.findOne({
      where: { id: id },
      include: { model: imageGallery, attributes: ["id", "imageUrl"] },
    });

    // declare notification
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // console.log(gallery);

    // render to view page
    res.render("admin/gallery/view_gallery", {
      alert,
      gallery,
      title: "Suburbia.east | Detail Gallery",
      action: "show image",
    });
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/gallery");
  }
};

const showEditGallery = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;

    // function query find by id with relational table
    const gallery = await Gallery.findOne({
      where: { id: id },
      include: [
        {
          model: imageGallery,
          attributes: ["id", "imageUrl"],
        },
        {
          model: Artist,
          attributes: ["id", "firstName", "lastName", "profilePhoto"],
        },
      ],
    });

    // get artist for select option
    const artist = await Artist.findAll();

    // notification
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // render to view page
    res.render("admin/gallery/view_gallery", {
      alert,
      artist,
      gallery,
      action: "edit",
      title: "Suburbia.east | Edit Gallery",
    });
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/gallery");
  }
};

const editGallery = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;

    // get all data from boyd
    const { artistId, type } = req.body;

    // function query find by id with relational table
    const gallery = await Gallery.findOne({
      where: { id: id },
      include: [
        {
          model: imageGallery,
          attributes: ["id", "imageUrl"],
        },
        {
          model: Artist,
          attributes: ["id", "firstName", "lastName", "profilePhoto"],
        },
      ],
    });

    // condition edit with images
    if (req.files.length > 0) {
      // looping form images length

      /* Masih pertanyaan */
      for (let i = 0; i < gallery.imageGalleries.length; i++) {
        // function find by pk
        const imageUpdate = await imageGallery.findByPk(
          gallery.imageGalleries[i].id
        );

        // delete saved images
        await fs.unlink(path.join(`public/${imageUpdate.imageUrl}`));

        // update with new images
        imageUpdate.imageUrl = `images/${req.files[i].filename}`;
        await imageUpdate.save();
      }

      // declare data from body
      gallery.type = type;
      gallery.artistId = artistId;

      // function save
      await gallery.save();

      // notification
      req.flash("alertMessage", "Success edit gallery");
      req.flash("alertStatus", "success");

      // redirect
      res.redirect("/admin/gallery");

      // condition if edit without images
    } else {
      // declare data from body
      gallery.type = type;
      gallery.artistId = artistId;

      // function save
      await gallery.save();

      // notification
      req.flash("alertMessage", "Success edit gallery");
      req.flash("alertStatus", "success");

      // redirect
      res.redirect("/admin/gallery");
    }
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/gallery");
  }
};

const deleteGallery = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;

    // function query find by id with relational table
    const gallery = await Gallery.findOne({
      where: { id: id },
      include: {
        model: imageGallery,
        attributes: ["id", "imageUrl", "galleryId"],
      },
    });

    // looping for images length
    for (let i = 0; i < gallery.imageGalleries.length; i++) {
      // function find by pk
      await imageGallery
        .findByPk(gallery.imageGalleries[i].id)
        .then((image) => {
          // delete saved image
          fs.unlink(path.join(`public/${image.imageUrl}`));
        });
    }

    // delete all data on table
    await gallery.destroy();

    // notification
    req.flash("alertMessage", "Success delete gallery");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect("/admin/gallery");
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/gallery");
  }
};

/* Artist */

const viewArtist = async (req, res) => {
  try {
    // function query find all news data
    const artist = await Artist.findAll();

    // declare notification
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // render data to view page
    res.render("admin/artist/view_artist", {
      alert,
      artist,
      title: "Suburbia.east | News",
    });
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/artist");
  }
};

const addArtist = async (req, res) => {
  try {
    // get data from body
    const { firstName, lastName } = req.body;

    // function create
    await Artist.create({
      firstName,
      lastName,

      // create with image
      profilePhoto: `images/${req.file.filename}`,
    });

    // notification
    req.flash("alertMessage", "Success add artist");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect("/admin/artist");
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/artist");
  }
};

const editArtist = async (req, res) => {
  try {
    // get data from body
    const { id, firstName, lastName } = req.body;

    // function query find by id
    const artist = await Artist.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "firstName", "lastName", "profilePhoto"],
    });

    // condition if edit without image
    if (req.file == undefined) {
      // function update
      await artist.update({
        firstName: firstName,
        lastName: lastName,
      });

      // notification
      req.flash("alertMessage", "Success update artist");
      req.flash("alertStatus", "success");

      // redirect
      res.redirect("/admin/artist");

      // condition if edit with image
    } else {
      // delete saved image
      await fs.unlink(path.join(`public/${artist.profilePhoto}`));

      // declare all data include image
      artist.firstName = firstName;
      artist.lastName = lastName;
      artist.profilePhoto = `images/${req.file.filename}`;

      // function save
      await artist.save();

      // notification
      req.flash("alertMessage", "Success update artist");
      req.flash("alertStatus", "success");

      // redirect
      res.redirect("/admin/artist");
    }
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("aletStatus", "danger");
    res.redirect("/admin/artist");
  }
};

const deleteArtist = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;

    // function query find by id
    const getArtistId = await Artist.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "firstName", "lastName", "profilePhoto"],
    });

    // delete saved image
    await fs.unlink(path.join(`public/${getArtistId.profilePhoto}`));

    // delete all data on table
    await Artist.destroy({
      where: {
        id: id,
      },
    });

    // notification
    req.flash("alertMessage", "Success delete artist");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect("/admin/artist");
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/artist");
  }
};

/* Author */

const viewAuthor = async (req, res) => {
  try {
    // function query find all news data
    const author = await Author.findAll();

    // declare notification
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // render data to view page
    res.render("admin/author/view_author", {
      alert,
      author,
      title: "Suburbia.east | Author",
    });
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/author");
  }
};

const addAuthor = async (req, res) => {
  try {
    // get data from body
    const { firstName, lastName } = req.body;

    // function create
    await Author.create({
      firstName,
      lastName,

      // create with image
      profilePhoto: `images/${req.file.filename}`,
    });

    // notification
    req.flash("alertMessage", "Success add author");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect("/admin/author");
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/author");
  }
};

const editAuthor = async (req, res) => {
  try {
    // get data from body
    const { id, firstName, lastName } = req.body;

    // function query find by id
    const author = await Author.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "firstName", "lastName", "profilePhoto"],
    });

    // condition if edit without image
    if (req.file == undefined) {
      // function update
      await author.update({
        firstName: firstName,
        lastName: lastName,
      });

      // notification
      req.flash("alertMessage", "Success update author");
      req.flash("alertStatus", "success");

      // redirect
      res.redirect("/admin/author");

      // condition if edit with image
    } else {
      // delete saved image
      await fs.unlink(path.join(`public/${author.profilePhoto}`));

      // declare all data include image
      author.firstName = firstName;
      author.lastName = lastName;
      author.profilePhoto = `images/${req.file.filename}`;

      // function save
      await author.save();

      // notification
      req.flash("alertMessage", "Success update author");
      req.flash("alertStatus", "success");

      // redirect
      res.redirect("/admin/author");
    }
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("aletStatus", "danger");
    res.redirect("/admin/author");
  }
};

const deleteAuthor = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;

    // function query find by id
    const getAuthorId = await Author.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "firstName", "lastName", "profilePhoto"],
    });

    // delete saved image
    await fs.unlink(path.join(`public/${getAuthorId.profilePhoto}`));

    // delete all data on table
    await Author.destroy({
      where: {
        id: id,
      },
    });

    // notification
    req.flash("alertMessage", "Success delete author");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect("/admin/author");
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect("/admin/author");
  }
};

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
  viewItem,
  viewArtist,
  addArtist,
  editArtist,
  deleteArtist,
  viewGallery,
  addGallery,
  showImageGallery,
  showEditGallery,
  editGallery,
  deleteGallery,
  viewAuthor,
  addAuthor,
  editAuthor,
  deleteAuthor,
  // viewAddImageMerchandise,
  addImageMerchandise,
};
