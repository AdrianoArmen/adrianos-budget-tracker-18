const router = require("express").Router();

const apiRoutes = require("./apiR");
const homeRoutes = require("./homeR");

router.use("/", homeRoutes);
router.use("/api", apiRoutes);

module.exports = router;
