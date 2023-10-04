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
  