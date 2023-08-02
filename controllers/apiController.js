const { 
    Category,
    imageMerchandise,
    Merchandise,
    News, 
    Item,
    Image
} 
    = require("../models/model")

const response = require("../utils/response")

module.exports = {
    landingPage : async (req, res) => {
        try {

            const headlineNews = await News.findAll({
                order: [
                    ["date", "ASC"]
                ],
                limit: 4,
                attributes: ["id", "title", "date", "imageUrl"]
            })

            const uncomingShow = await Item.findAll({
                order: [
                    ["date", "DESC"]
                ],
                attributes: ["id", "title", "artist", "city", "country", "location", "date", "startHour", "endHour"],
                include: [
                    {
                        model: Image,
                        attributes: ["id", "imageUrl"]
                    },
                    {
                        model: Category,
                        attributes: ["id", "name"]
                    }
                ]
            })

            const recentShow = await Item.findAll({
                order: [
                    ["date", "DESC"]
                ],
                attributes: ["id", "title", "artist", "city", "country", "location", "date", "startHour", "endHour"],
                include: [
                    {
                        model: Image,
                        attributes: ["id", "imageUrl"]
                    },
                    {
                        model: Category,
                        attributes: ["id", "name"]
                    }
                ]
            })

            const officialMerchandise = await Merchandise.findAll({
                order: [
                    ["createdAt", "DESC"]
                ],
                limit: 4,
                attributes: ["id", "title", "price", "size"],
                include: [
                    {
                        /* example using where */
                        where: {id: 2},
                        model: imageMerchandise,
                        attributes: ["id", "imageUrl"],
                        limit: 1,
                    }
                ]
            })

            response (200, {headlineNews, recentShow, uncomingShow, officialMerchandise}, "success get landing page", true, res)

        } catch (error) {
            response (500, "Internal server error", false, res)
        }
    }
}