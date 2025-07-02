const {
  News,
  Item,
  Image,
  Rooster,
  Category,
  imageMerchandise,
  Merchandise,
  Author,
  Artist,
} = require("../models/model");

const response = require("../utils/response");

const { Op } = require("sequelize");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const exploreNews = await News.findAll({
        order: [["date", "DESC"]],
        limit: 4,
        attributes: ["id", "title", "slug", "date", "imageUrl"],
      });

      const recentShow = await Item.findAll({
        order: [["date", "DESC"]],
        limit: 1,
        attributes: ["id", "slug", "title", "organizer"],
        include: [
          {
            model: Image,
            attributes: ["id", "isHeader", "imageUrl"],
            where: { isHeader: true },
            limit: 1,
          },
        ],
      });

      const roaster = await Rooster.findAll({
        order: [["nameBand", "ASC"]],
        limit: 6,
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

      const merchandise = await Merchandise.findAll({
        order: [["isSold", "DESC"]],
        limit: 4,
        attributes: ["id", "slug"],
        where: { isSold: 0 },
        include: [
          {
            model: imageMerchandise,
            attributes: ["id", "isDefault", "imageUrl"],
            where: { isDefault: true },
            limit: 1,
          },
        ],
      });

      response(
        200,
        {
          exploreNews,
          recentShow,
          roaster,
          merchandise,
        },
        "success get landing page",
        true,
        res
      );
    } catch (error) {
      response(500, "Internal server error", false, res);
    }
  },

  newsPage: async (req, res) => {
    try {
      const headlineNews = await News.findAll({
        order: [["date", "DESC"]],
        attributes: ["id", "title", "slug", "imageUrl", "type"],
        limit: 3,
      });

      const allNews = await News.findAll({
        order: [["date", "DESC"]],
        attributes: ["id", "title", "slug", "type", "imageUrl"],
        include: {
          model: Author,
          attributes: ["id", "firstName", "lastName"],
        },
      });
      response(
        200,
        { headlineNews, allNews },
        "Success get detail page",
        true,
        res
      );
    } catch (error) {
      response(500, "Internal server error", false, res);
    }
  },

  detailNewsPage: async (req, res) => {
    try {
      const { slug } = req.params;
      const detailNews = await News.findOne({
        where: { slug },
        attributes: ["id", "title", "slug", "date", "description", "imageUrl"],
        include: {
          model: Author,
          attributes: ["id", "firstName", "lastName", "slug", "profilePhoto"],
        },
      });

      if (!detailNews) {
        response(404, null, "Berita Tidak Ditemukan!", false, res);
      } else if (detailNews.slug !== slug) {
        response(404, null, "Berita Tidak Ditemukan!", false, res);
      } else {
        const news = await News.findAll({
          order: [["date", "DESC"]],
          limit: 3,
          attributes: ["id", "title", "slug", "date", "imageUrl"],
        });

        response(
          200,
          { detailNews, news },
          "Success get detail page",
          true,
          res
        );
      }
    } catch (error) {
      response(500, "Internal server error", false, res);
    }
  },

  roasterPage: async (req, res) => {
    try {
      const allRoaster = await Rooster.findAll({
        order: [["nameBand", "ASC"]],
        attributes: [
          "id",
          "nameBand",
          "slug",
          "city",
          "genre",
          "description",
          "country",
          "instagram",
          "spotify",
          "imageUrl",
        ],
      });
      response(200, { allRoaster }, "Success get roaster page", true, res);
    } catch (error) {
      response(500, "Internal server error", false, res);
    }
  },

  limitedRoasterPage: async (req, res) => {
    const searchQuery = req.query.search || "";

    try {
      const allRoaster = await Rooster.findAll({
        where: {
          nameBand: {
            [Op.like]: `%${searchQuery}%`,
          },
        },
        order: [["nameBand", "ASC"]],
        attributes: [
          "id",
          "nameBand",
          "city",
          "genre",
          "country",
          "instagram",
          "spotify",
          "imageUrl",
        ],
      });
      // limit per page
      const limitPerPage = 5;
      // Mendapatkan total jumlah data Roaster
      const totalRoasterCount = allRoaster.length;

      // Menghitung total halaman berdasarkan batasan data per halaman
      const totalPages = Math.ceil(totalRoasterCount / limitPerPage);

      // Mengambil parameter page dari permintaan
      const page = parseInt(req.query.page) || 1;

      // Menghitung offset untuk data yang akan ditampilkan pada halaman ini
      const offset = (page - 1) * limitPerPage;

      // Mengambil data yang sesuai untuk halaman ini
      const allRoasterPerPage = allRoaster.slice(offset, offset + limitPerPage);

      if (page > totalPages) {
        return response(200, null, "page not found", false, res);
      }

      response(
        200,
        {
          allRoasterPerPage,
          metadata: {
            page: page,
            limit: limitPerPage,
            totalPages: totalPages,
            totalData: totalRoasterCount,
          },
        },
        "Success get limited roaster page",
        true,
        res
      );
    } catch (error) {
      response(500, "Internal server error", false, res);
    }
  },

  detailMerchandise: async (req, res) => {
    try {
      const { slug } = req.params;
      const detailMerchandise = await Merchandise.findOne({
        where: { slug },
        attributes: [
          "id",
          "title",
          "slug",
          "price",
          "size",
          "shopeeUrl",
          "tokopediaUrl",
          "isSold",
        ],
        include: {
          model: imageMerchandise,
          attributes: ["id", "imageUrl", "isDefault"],
        },
      });

      if (!detailMerchandise) {
        response(404, null, "Merchandise tidak ditemukan!", false, res);
      } else if (detailMerchandise.slug !== slug) {
        response(404, null, "Merchandise tidak ditemukan!", false, res);
      } else {
        const recommendMerchandise = await Merchandise.findAll({
          order: [["id", "DESC"]],
          limit: 4,
          attributes: ["id", "title", "slug", "price"],
          include: {
            model: imageMerchandise,
            attributes: ["id", "imageUrl"],
            where: { isDefault: true },
          },
        });
        response(
          200,
          { detailMerchandise, recommendMerchandise },
          "Success get detail page",
          true,
          res
        );
      }
    } catch (error) {
      response(500, "Internal server error", false, res);
    }
  },

  recentShowPage: async (req, res) => {
    try {
      const recentShow = await Item.findAll({
        order: [["date", "DESC"]],
        attributes: [
          "id",
          "title",
          "slug",
          "artist",
          "location",
          "city",
          "date",
        ],
        include: [
          {
            model: Category,
            attributes: ["id", "name", "slug"],
          },
          {
            model: Image,
            attributes: ["id", "imageUrl", "isDefault"],
            where: { isDefault: true },
          },
        ],
      });
      if (!recentShow) {
        return response(404, null, "page not found", false, res);
      }

      response(200, { recentShow }, "success get recent show", true, res);
    } catch (error) {
      response(500, error, "internal server error", false, res);
    }
  },

  detailShowPage: async (req, res) => {
    try {
      const { slug } = req.params;

      const detailShow = await Item.findOne({
        where: { slug },
        attributes: [
          "id",
          "title",
          "slug",
          "artist",
          "location",
          "city",
          "date",
          "startHour",
          "endHour",
          "organizer",
          "ticket",
          "description",
        ],
        include: [
          {
            model: Image,
            attributes: ["id", "isDefault", "isHeader", "imageUrl"],
            where: { isHeader: true },
          },
        ],
      });

      const gallery = await Item.findOne({
        where: { slug },
        attributes: ["id", "title", "slug"],
        include: [
          {
            model: Image,
            attributes: ["id", "isDefault", "isHeader", "artistId", "imageUrl"],
            where: { isHeader: false },
            include: [
              {
                model: Artist,
                attributes: [
                  "id",
                  "firstName",
                  "lastName",
                  "slug",
                  "profilePhoto",
                ],
              },
            ],
          },
        ],
      });

      if (!detailShow && !gallery) {
        return response(404, null, "show not found", false, res);
      } else if (detailShow.slug && gallery.slug !== slug) {
        return response(404, null, "show not found", false, res);
      } else {
        response(200, { detailShow, gallery }, "Success get detail", true, res);
      }
    } catch (error) {
      response(500, error, "internal server error!", false, res);
    }
  },

  detailRoasterPage: async (req, res) => {
    try {
      const { slug } = req.params;

      const detailRoaster = await Rooster.findOne({
        where: { slug },
        attributes: [
          "id",
          "nameBand",
          "slug",
          "city",
          "genre",
          "instagram",
          "spotify",
          "description",
          "imageUrl",
        ],
      });

      if (!detailRoaster) {
        return response(404, null, "detail roaster not found", false, res);
      } else if (detailRoaster.slug !== slug) {
        return response(404, null, "detail roaster not found", false, res);
      } else {
        response(
          200,
          { detailRoaster },
          "success get detail roaster",
          true,
          res
        );
      }
    } catch (error) {
      response(500, error, "internal server error", false, res);
    }
  },

  detailAuthorPage: async (req, res) => {
    try {
      const { slug } = req.params;

      const detailAuthor = await Author.findOne({
        where: { slug },
        attributes: ["id", "firstName", "lastName", "slug", "profilePhoto"],
      });

      if (!detailAuthor) {
        return response(404, null, "detail author not found", false, res);
      } else if (detailAuthor.slug !== slug) {
        return response(404, null, "detail author not found", false, res);
      } else {
        response(200, { detailAuthor }, "success get detail author", true, res);
      }
    } catch (error) {
      response(500, error, "internal server error", false, res);
    }
  },

  imageShowPage: async (req, res) => {
    try {
      const allImage = await Image.findAll({
        where: { category: "photo" },
        attributes: ["id", "imageUrl", "category"],
        include: [
          {
            model: Artist,
            attributes: ["id", "firstName", "lastName", "slug", "profilePhoto"],
          },
        ],
      });
      if (!allImage) {
        return response(404, null, "page not found", false, res);
      }

      response(200, { allImage }, "success get image", true, res);
    } catch (error) {
      response(500, "internal server error", false, res);
    }
  },

  artworkShowPage: async (req, res) => {
    try {
      const allArtwork = await Image.findAll({
        where: { category: "artwork" },
        attributes: ["id", "imageUrl", "category"],
        include: [
          {
            model: Artist,
            attributes: ["id", "firstName", "lastName", "slug", "profilePhoto"],
          },
        ],
      });
      if (!allArtwork) {
        return response(404, null, "page not found", false, res);
      }

      response(200, { allArtwork }, "success get image", true, res);
    } catch (error) {
      response(500, "internal server error", false, res);
    }
  },

  detailArtistPage: async (req, res) => {
    try {
      const { slug } = req.params;

      const detailArtist = await Artist.findOne({
        where: { slug },
        attributes: ["id", "firstName", "lastName", "slug", "profilePhoto"],
      });

      if (detailArtist) {
        const gallery = await Image.findAll({
          attributes: [
            "id",
            "imageUrl",
            "category",
            "isDefault",
            "isHeader",
            "artistId",
            "itemId",
          ],
          where: { artistId: detailArtist.id },
        });
        response(
          200,
          { detailArtist, gallery },
          "berhasil mengambil data",
          true,
          res
        );
      } else {
        return response(404, "artist not found", false, res);
      }
    } catch (error) {
      return response(500, "internal server error", false, res);
    }
  },
};
