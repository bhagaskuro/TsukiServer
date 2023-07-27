const { User, Cuisine, Category } = require("../models");

class CuisCon {
  //static async for insert new cuisine
  static async createCuisine(req, res, next) {
    try {
      const newData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
        categoryId: req.body.categoryId,
        authorId: req.user.id,
      };

      let createData = await Cuisine.create(newData);
      res.status(201).json(createData);
    } catch (error) {
      next(error);
    }
  }

  //static async for read all cuisines data
  static async getCuisines(req, res, next) {
    try {
      const cuisines = await Cuisine.findAll({
        include: [
          {
            model: User,
            attributes: ["username", "email"],
          },
          {
            model: Category,
            attributes: ["id", "name"],
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "desc"]],
      });

      res.status(200).json(cuisines);
    } catch (error) {
      next(error);
    }
  }

  //static async for read post by Id
  static async getCuisineById(req, res, next) {
    try {
      const cuisine = await Cuisine.findByPk(req.params.id, {
        include: [
          {
            model: User,
            attributes: ["username", "email"],
          },
          {
            model: Category,
            attributes: ["id", "name"],
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (!cuisine) throw { name: "NotFound" };
      res.status(200).json(cuisine);
    } catch (error) {
      next(error);
    }
  }

  //static async methot for delete cuisine by Id
  static async deleteCuisineById(req, res, next) {
    try {
      const { id } = req.params;
      const data = await Cuisine.findByPk(id);

      if (!data) throw { name: "NotFound" };
      await Cuisine.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({ message: `${data.name} success to delete` });
    } catch (error) {
      next(error);
    }
  }

  //static async methot for update cuisine by Id
  static async updateCuisineById(req, res, next) {
    try {
      const { id } = req.params;
      const newData = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        imgUrl: req.body.imgUrl,
        categoryId: req.body.categoryId,
      };

      await Cuisine.update(newData, {
        where: {
          id: id,
        },
      });
      res.status(200).json({ message: `Data with id ${id} updated` });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CuisCon;
