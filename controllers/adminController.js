const {
  Category,
  Rooster,
  Merchandise,
  imageMerchandise,
  News,
  Item,
  Image,
  Artist,
  Author,
} = require("../models/model");

const path = require("path");
const fs = require("fs-extra");

const slugify = require("slugify");

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

    // generate slug from the name
    const slug = slugify(name, {
      lower: true, // Convert slug to lowercase
      remove: /[*+~.()'"!:@]/g, // Remove special characters
    });

    // save data
    await Category.create({
      name,
      slug,
    });

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

    const slug = slugify(name, {
      lower: true, // Convert slug to lowercase
      remove: /[*+~.()'"!:@]/g, // Remove special characters
    });

    // function update data
    await category.update({
      name: name,
      slug: slug,
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
    const { nameBand, city, genre, instagram, spotify, about } = req.body;

    const slug = slugify(nameBand, {
      lower: true, // Convert slug to lowercase
      remove: /[*+~.()'"!:@]/g, // Remove special characters
    });

    // function save
    await Rooster.create({
      nameBand,
      city,
      genre,
      instagram,
      spotify,
      slug,
      description: about,
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
    const { id, nameBand, city, genre, instagram, spotify, about_rooster } =
      req.body;

    const slug = slugify(nameBand, {
      lower: true, // Convert slug to lowercase
      remove: /[*+~.()'"!:@]/g, // Remove special characters
    });

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
        "slug",
        "description",
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
        slug: slug,
        description: about_rooster,
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
      rooster.slug = slug;
      rooster.description = about_rooster;

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

const addMerchandise = async (req, res) => {
  try {
    // get data from body
    const { title, price, size, shopeeUrl, tokopediaUrl, about } = req.body;

    const slug = slugify(title, {
      lower: true, // Convert slug to lowercase
      remove: /[*+~.()'"!:@]/g, // Remove special characters
    });

    // function save
    await Merchandise.create({
      title,
      price,
      size,
      shopeeUrl,
      tokopediaUrl,
      slug,
      description: about,
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
    const { title, price, size, shopeeUrl, tokopediaUrl, isSold, about } =
      req.body;

    const slug = slugify(title, {
      lower: true, // Convert slug to lowercase
      remove: /[*+~.()'"!:@]/g, // Remove special characters
    });

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
      merchandise.slug = slug;
      merchandise.isSold = isSold;
      merchandise.description = about;

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
      merchandise.slug = slug;
      merchandise.isSold = isSold;
      merchandise.description = about;

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
        order: [[imageMerchandise, "isDefault", "ASC"]],
      },
    });

    merchandise.imageMerchandises.sort((a, b) => {
      if (a.isDefault === true && b.isDefault === false) {
        return -1;
      } else if (a.isDefault === false && b.isDefault === true) {
        return 1;
      } else {
        return 0;
      }
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
    res.redirect(`/admin/merchandise/show-image/${merchandiseId}`);
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect(`/admin/merchandise/show-image/${merchandiseId}`);
  }
};

const deleteImageMerchandise = async (req, res) => {
  try {
    // get data from params
    const { id } = req.params;

    // function query find by id
    const getImageId = await imageMerchandise.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "isDefault", "merchandiseId", "imageUrl"],
    });

    const merchandiseId = getImageId.merchandiseId;

    // delete saved image
    await fs.unlink(path.join(`public/${getImageId.imageUrl}`));

    // delete value by id
    await imageMerchandise.destroy({
      where: {
        id: id,
      },
    });

    // notification
    req.flash("alertMessage", "Success delete image");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect(`/admin/merchandise/show-image/${merchandiseId}`);
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect(`/admin/merchandise/show-image/${merchandiseId}`);
  }
};

/* News */

const viewNews = async (req, res) => {
  try {
    // function query find all news data
    const news = await News.findAll({
      attributes: [
        "id",
        "title",
        "artist",
        "date",
        "description",
        "type",
        "imageUrl",
      ],
      include: {
        model: Author,
      },
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

    const slug = slugify(title, {
      lower: true, // Convert slug to lowercase
      remove: /[*+~.()'"!:@,]/g, // Remove special characters
    });

    // function create
    await News.create({
      title,
      artist,
      date,
      type,
      slug,
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
  /* Try news */

  try {
    // get data from body
    const { id, title, artist, date, type, about_news, authorId } = req.body;

    const slug = slugify(title, {
      lower: true, // Convert slug to lowercase
      remove: /[*+~.()'"!:@]/g, // Remove special characters
    });

    // function find rooster by id
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
        "slug",
        "imageUrl",
      ],
    });

    // condition if edit without file
    if (req.file == undefined) {
      // function update without file
      await news.update({
        title: title,
        artist: artist,
        date: date,
        type: type,
        slug: slug,
        description: about_news,
      });

      // notification
      req.flash("alertMessage", "Success update news");
      req.flash("alertStatus", "success");

      // redirect
      res.redirect("/admin/news");

      // condition if edit with file
    } else {
      // delete saved image
      await fs.unlink(path.join(`public/${news.imageUrl}`));

      // declare value from body
      news.title = title;
      news.artist = artist;
      news.date = date;
      news.type = type;
      news.slug = slug;
      news.description = about_news;

      // declare image from body
      news.imageUrl = `images/${req.file.filename}`;

      // function update
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

    const allImage = await Image.findAll();

    const selectItem = await Item.findAll();

    const selectArtist = await Artist.findAll();

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
      allImage,
      selectItem,
      selectArtist,
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
      ticket,
    } = req.body;

    const slug = slugify(title, {
      lower: true, // Convert slug to lowercase
      remove: /[*+~.()'"!:@]/g, // Remove special characters
    });

    // if (req.files.length > 0) {
    // function query find by id
    const category = await Category.findOne({
      where: { id: categoryId },
    });

    // fucntion create
    const newItem = await Item.create({
      categoryId: category.id,
      title,
      slug,
      city,
      date,
      startHour,
      endHour,
      organizer,
      description: about,
      artist,
      location,
      ticket,
    });
    await category.addItem(newItem);

    // for (let i = 0; i < req.files.length; i++) {
    //   const imageSave = await Image.create({
    //     imageUrl: `images/${req.files[i].filename}`,
    //   });
    //   await newItem.addImage(imageSave);
    // }

    // notification
    req.flash("alertMessage", "Success add item");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect("/admin/item");
    // }
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
      ticket,
    } = req.body;

    const slug = slugify(title, {
      lower: true, // Convert slug to lowercase
      remove: /[*+~.()'"!:@]/g, // Remove special characters
    });

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
      item.slug = slug;
      item.date = date;
      item.startHour = startHour;
      item.endHour = endHour;
      item.city = city;
      item.organizer = organizer;
      item.description = about;
      item.categoryId = categoryId;
      item.artist = artist;
      item.location = location;
      item.ticket = ticket;

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
      item.slug = slug;
      item.date = date;
      item.startHour = startHour;
      item.endHour = endHour;
      item.city = city;
      item.organizer = organizer;
      item.description = about;
      item.categoryId = categoryId;
      item.artist = artist;
      item.location = location;
      item.ticket = ticket;

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

const showImageItem = async (req, res) => {
  try {
    // get id from params
    const { id } = req.params;

    // function query find by id with relational table
    const item = await Item.findOne({
      where: { id: id },
      include: {
        model: Image,
        attributes: ["id", "imageUrl", "isDefault", "isHeader", "category"],
        order: [
          [Image, "isDefault", "ASC"],
          [Image, "isHeader", "ASC"],
        ],
      },
    });

    // Setelah Anda mendapatkan data dari database, Anda dapat melakukan pengurutan dalam JavaScript
    item.Images.sort((a, b) => {
      // Prioritaskan yang isDefault dan isHeader sama-sama true
      if (a.isDefault === true && b.isDefault === false) {
        return -1; // a lebih dulu
      } else if (a.isDefault === false && b.isDefault === true) {
        return 1; // b lebih dulu
      } else if (a.isHeader === true && b.isHeader === false) {
        return -1; // a lebih dulu
      } else if (a.isHeader === false && b.isHeader === true) {
        return 1; // b lebih dulu
      } else {
        return 0; // urutan tetap sama jika tidak ada isDefault atau isHeader yang sama-sama true
      }
    });

    // declare notification
    const alertMessage = req.flash("alertMessage");
    const alertStatus = req.flash("alertStatus");
    const alert = { message: alertMessage, status: alertStatus };

    // render to view page
    res.render("admin/item/view_item", {
      alert,
      item: item,
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

const addImageItem = async (req, res) => {
  try {
    const { isDefault, isHeader, category, itemId, artistId } = req.body;

    // function save
    await Image.create({
      itemId,
      artistId,
      category,
      isDefault,
      isHeader,
      imageUrl: `images/${req.file.filename}`,
    });

    // notification
    req.flash("alertMessage", "Success add image item");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect(`/admin/item/show-image/${itemId}`);
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect(`/admin/item/show-image/${itemId}`);
  }
};

const deleteImageItem = async (req, res) => {
  try {
    // get data from params
    const { id } = req.params;

    // function query find by id
    const getImageId = await Image.findOne({
      where: {
        id: id,
      },
      attributes: [
        "id",
        "isDefault",
        "isHeader",
        "category",
        "itemId",
        "artistId",
        "imageUrl",
      ],
    });

    const itemId = getImageId.itemId;

    // delete saved image
    await fs.unlink(path.join(`public/${getImageId.imageUrl}`));

    // delete value by id
    await Image.destroy({
      where: {
        id: id,
      },
    });

    // notification
    req.flash("alertMessage", "Success delete image");
    req.flash("alertStatus", "success");

    // redirect
    res.redirect(`/admin/item/show-image/${itemId}`);
  } catch (error) {
    // catch error
    req.flash("alertMessage", `${error.message}`);
    req.flash("alertStatus", "danger");
    res.redirect(`/admin/item/${itemId}`);
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

    // generate slug from firstName and lastName
    const slug = slugify(`${firstName} ${lastName}`, {
      lower: true, // Convert slug to lowercase
      remove: /[*+~.()'"!:@]/g, // Remove special characters
    });

    // function create
    await Artist.create({
      firstName,
      lastName,
      slug,

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

    const slug = slugify(`${firstName} ${lastName}`, {
      lower: true, // Convert slug to lowercase
      remove: /[*+~.()'"!:@]/g, // Remove special characters
    });

    // function query find by id
    const artist = await Artist.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "firstName", "lastName", "slug", "profilePhoto"],
    });

    // condition if edit without image
    if (req.file == undefined) {
      // function update
      await artist.update({
        firstName: firstName,
        lastName: lastName,
        slug: slug,
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
      artist.slug = slug;
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

    const slug = slugify(`${firstName} ${lastName}`, {
      lower: true, // Convert slug to lowercase
      remove: /[*+~.()'"!:@]/g, // Remove special characters
    });

    // function create
    await Author.create({
      firstName,
      lastName,
      slug,

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

    const slug = slugify(`${firstName} ${lastName}`, {
      lower: true, // Convert slug to lowercase
      remove: /[*+~.()'"!:@]/g, // Remove special characters
    });

    // function query find by id
    const author = await Author.findOne({
      where: {
        id: id,
      },
      attributes: ["id", "firstName", "lastName", "slug", "profilePhoto"],
    });

    // condition if edit without image
    if (req.file == undefined) {
      // function update
      await author.update({
        firstName: firstName,
        lastName: lastName,
        slug: slug,
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
      author.slug = slug;
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
  viewAuthor,
  addAuthor,
  editAuthor,
  deleteAuthor,
  addImageMerchandise,
  deleteImageMerchandise,
  addImageItem,
  deleteImageItem,
};
