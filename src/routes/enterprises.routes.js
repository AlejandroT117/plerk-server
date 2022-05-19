const router = require("express").Router();

const enterpriseCtlr = require("../controllers/enterprises.controller");

router.get("/", enterpriseCtlr.getByName);
router.get("/:id", enterpriseCtlr.getById);
router.get("/transactions/:id", enterpriseCtlr.getTransactions)


module.exports = router;
