const CuisCon = require("../controllers/CuisinesControl");
const router = require("express").Router();

//Cuisines Routes
router.post("/", CuisCon.createCuisine);
router.get("/", CuisCon.getCuisines);
router.get("/:id", CuisCon.getCuisineById);
router.delete("/:id", CuisCon.deleteCuisineById);

module.exports = router;
