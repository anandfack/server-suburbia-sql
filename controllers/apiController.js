const { Category } = require("../models/model")
const response = require("../utils/response")
const landingPage = async (req, res) => {
    try {
        const category = await Category.findAll({
            order: [
                ["name", "ASC"]
            ],
            attributes: ["id", "name"]
        })
        response(200, category, "Success get category", res)        
    } catch (error) {
        response(500, error.message, "Internal server error", res)
    }
}

module.exports = {
    landingPage
}