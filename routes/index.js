const Controller = require("../controllers");
const router = require("express").Router();
const cuisinesRoutes = require("./cuisinesRoutes");
const categoriesRoutes = require("./categoriesRoutes");
const customerRoutes = require("./customerRoutes");
const { authentication } = require("../middleware/auth");

//main router before auth
router.post("/register", Controller.register);
router.post("/login", Controller.login);

//modular router
router.use("/cuisines", authentication, cuisinesRoutes);
router.use("/categories", categoriesRoutes);
router.use("/pub", customerRoutes);

module.exports = router;
