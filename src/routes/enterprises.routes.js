const router = require("express").Router();

const enterpriseCtlr = require("../controllers/enterprises.controller");

router.get("/all", enterpriseCtlr.getAll);
router.get("/", enterpriseCtlr.getByName);
router.get("/:id", enterpriseCtlr.getById);
router.get("/transactions/:id", enterpriseCtlr.getTransactionsOfCompany)
router.get("/transactions/dates/:id", enterpriseCtlr.getNTransactionsByDate)


module.exports = router;
