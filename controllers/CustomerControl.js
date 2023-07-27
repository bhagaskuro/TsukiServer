const { User, Cuisine, Category, Cart } = require("../models");
const Axios = require("axios");
const { Op } = require("sequelize");

class CustCon {
  //static async for register new user
  static async register(req, res, next) {
    try {
      const newData = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        role: "Customer",
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
      };

      let createData = await User.create(newData);
      let { id, email } = createData;
      res.status(201).json({ id, email });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  //static async for read all cuisines data
  static async getCuisines(req, res, next) {
    try {
      const pageNum = req.query.page - 1 || 0;
      const pageSize = req.query.size || 9;
      const name = req.query.name;

      let query = {
        limit: pageSize,
        offset: pageNum * pageSize,
        where: {},
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "authorId"],
        },
        order: [["id", "desc"]],
      };

      //filter cuisine using name
      if (name) {
        query.where.name = { [Op.iLike]: `%${name}%` };
      }

      let { count, rows } = await Cuisine.findAndCountAll(query);
      const result = {
        totalPage: Math.ceil(count / query.limit),
        currentPage: pageNum + 1,
        data: rows,
      };

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  //static async for read cuisine by Id
  static async getCuisineById(req, res, next) {
    try {
      let cuisine = await Cuisine.findByPk(req.params.id, {
        include: [
          {
            model: Category,
            attributes: ["id", "name"],
          },
        ],
        attributes: {
          exclude: ["createdAt", "updatedAt", "authorId"],
        },
      });
      if (!cuisine) throw { name: "NotFound" };

      //create qrCode
      let { data } = await Axios({
        method: "post",
        url: "https://api.qr-code-generator.com/v1/create",
        params: {
          "access-token":
            "MvJJ8Dff8zffme4yl1Qn2qpaE1aRUQz7OXggOZ8bvrkIB4VFz73inGt_FAo1FC2V",
        },
        data: {
          frame_name: "no-frame",
          qr_code_text: "http://localhost:3000" + "/addCart/" + req.params.id,
          image_format: "SVG",
          marker_right_inner_color: "#2d7cda",
          marker_right_outer_color: "#00bfff",
          marker_left_template: "version13",
          marker_right_template: "version13",
          marker_bottom_template: "version13",
        },
      });

      let result = {
        id: cuisine.id,
        name: cuisine.name,
        description: cuisine.description,
        price: cuisine.price,
        imgUrl: cuisine.imgUrl,
        categoryId: cuisine.categoryId,
        status: cuisine.status,
        Category: cuisine.Category,
        qr: data,
      };

      if (!cuisine) throw { name: "NotFound" };
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  //static async adding new favorite
  static async addCart(req, res, next) {
    try {
      const data = await Cart.findOne({
        where: {
          userId: req.user.id,
          cuisineId: req.params.id,
        },
      });

      if (data) {
        await Cart.update(
          { total: data.total + 1 },
          {
            where: { userId: req.user.id, cuisineId: req.params.id },
          }
        );
        res.status(200).json({ message: "data updated" });
      } else {
        const newData = {
          userId: req.user.id,
          cuisineId: req.params.id,
          total: 1,
          status: "incomplete",
        };

        let createData = await Cart.create(newData);
        let { userId, cuisineId } = createData;
        res.status(201).json({ userId, cuisineId });
      }
    } catch (error) {
      next(error);
    }
  }

  //static async getFav
  static async getCart(req, res, next) {
    try {
      const name = req.query.name;
      const { id } = req.user;

      let query = {
        include: [
          {
            model: Cuisine,
            as: "cuisine",
            attributes: {
              exclude: ["createdAt", "updatedAt"],
            },
          },
        ],
        where: { userId: `${id}`, status: "incomplete" },
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
        order: [["id", "desc"]],
      };

      //filter cuisine using name
      if (name) {
        query.where.name = { [Op.iLike]: `%${name}%` };
      }

      const cuisines = await Cart.findAll(query);

      res.status(200).json(cuisines);
    } catch (error) {
      next(error);
    }
  }

  //static async for update cuisines status
  static async updateStatus(req, res, next) {
    try {
      await Cart.update(
        { status: "paid" },
        {
          where: { userId: req.user.id },
        }
      );

      res.status(200).json({ message: "Invoice has been paid" });
    } catch (error) {
      next(error);
    }
  }

  //generate Midtrans token
  static async generateToken(req, res, next) {
    try {
      const ammount = req.body.ammount;
      const user = await User.findByPk(req.user.id);

      const midtransClient = require("midtrans-client");
      // Create Snap API instance
      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_KEY,
      });

      let parameter = {
        transaction_details: {
          order_id: "TRANS_" + Math.floor(1000000 + Math.random() * 9000000),
          gross_amount: ammount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: user.email,
        },
      };

      const midtransToken = await snap.createTransaction(parameter);
      console.log(midtransToken);
      res.status(200).json(midtransToken);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = CustCon;
