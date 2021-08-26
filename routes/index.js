const router = require("express").Router();

// both routes defined for page display and api calls

const apiRoutes = require("./apiR");
const homeRoutes = require("./homeR");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
