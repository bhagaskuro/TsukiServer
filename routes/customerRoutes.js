const CustCon = require("../controllers/CustomerControl");
const router = require("express").Router();
const { authentication } = require("../middleware/auth");

//Customer Routes
router.post("/register", CustCon.register);

router.get("/", CustCon.getCuisines);
router.get("/detail/:id", CustCon.getCuisineById);
router.post("/cart/:id", authentication, CustCon.addCart);
router.get("/cart", authentication, CustCon.getCart);
router.patch("/paid", authentication, CustCon.updateStatus);
router.post("/generateToken", authentication, CustCon.generateToken);

module.exports = router;
