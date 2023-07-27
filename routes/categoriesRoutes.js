const CatCon = require("../controllers/CategoryControl");
const router = require("express").Router();

//Category routes
router.get("/", CatCon.getCategory);

module.exports = router;
