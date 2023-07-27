const { Category } = require("../models");

class CatCon {
  //static async get all category
  static async getCategory(req, res, next) {
    try {
      const category = await Category.findAll({
        order: [["id", "desc"]],
      });

      res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CatCon;
