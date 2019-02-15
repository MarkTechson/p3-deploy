const express = require("express");
const router = express.Router();

/**
 * All data routes should be here.
 */
router.get("/sensitive", (req, res) => {
    res.json(["Mark", "Andy", "Sarah"]);
});
module.exports = router;