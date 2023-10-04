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
        attributes: ["id", "slug", "title"],
        include: [
          {
            model: Image,
            attributes: ["id", "isDefault", "category", "imageUrl"],
            limit: 1,
            include: [
              {
                model: Artist,
                attributes: ["id", "firstName", "lastName", "profilePhoto"],
              },
            ],
          },
          {
            model: Category,
            attributes: ["id", "slug", "name"],
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
        attributes: ["id", "title", "date", "slug", "type", "imageUrl"],
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
            attributes: ["id", "imageUrl", "isDefault", "category"],
            include: [
              {
                model: Artist,
                attributes: ["id", "firstName", "lastName", "profilePhoto"],
              },
            ],
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
        ],
        include: [
          {
            model: Image,
            attributes: ["id", "imageUrl"],
          },
          {
            model: Category,
            attributes: ["id", "name", "slug"],
          },
        ],
      });

      if (!detailShow) {
        return response(404, null, "show not found", false, res);
      } else if (detailShow.slug !== slug) {
        return response(404, null, "show not found", false, res);
      } else {
        response(200, { detailShow }, "Success get detail", true, res);
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
};
