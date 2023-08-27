const {
  News,
  Item,
  Image,
  Rooster,
  Category,
  imageMerchandise,
  Merchandise,
  Author,
} = require("../models/model");

const response = require("../utils/response");

module.exports = {
  landingPage: async (req, res) => {
    try {
      const exploreNews = await News.findAll({
        order: [["date", "DESC"]],
        limit: 4,
        attributes: ["id", "title", "date", "imageUrl"],
      });

      const recentShow = await Item.findAll({
        order: [["date", "DESC"]],
        limit: 1,
        attributes: ["id", "title"],
        include: [
          {
            model: Image,
            attributes: ["id", "imageUrl"],
            limit: 1,
          },
          {
            model: Category,
            attributes: ["id", "name"],
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
        attributes: ["id"],
        where: { isSold: 0 },
        include: [
          {
            model: imageMerchandise,
            attributes: ["id", "imageUrl"],
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
        attributes: ["id", "title", "imageUrl", "type"],
        limit: 3,
      });

      const allNews = await News.findAll({
        order: [["date", "DESC"]],
        attributes: ["id", "title", "author", "date", "type", "imageUrl"],
      });
      response(
        200,
        { headlineNews, allNews },
        "Success get news page",
        true,
        res
      );
    } catch (error) {
      response(500, "Internal server error", false, res);
    }
  },

  detailNewsPage: async (req, res) => {
    try {
      const { id } = req.params;
      const detailNews = await News.findOne({
        where: { id: id },
        attributes: ["id", "title", "date", "description", "imageUrl"],
        include: {
          model: Author,
          attributes: ["id", "firstName", "lastName", "profilePhoto"]
        }
      });
      const news = await News.findAll({
        order: [["date", "DESC"]],
        limit: 3,
        attributes: ["id", "title", "date", "imageUrl"]
      })
      response(200, { detailNews, news }, "Success get detail page", true, res);
    } catch (error) {}
  },
};
