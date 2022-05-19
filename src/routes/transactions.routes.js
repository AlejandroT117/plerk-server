const router = require('express').Router()

const resumenCtlr = require('../controllers/transactions.controller')

router.get("/", resumenCtlr.mostSales)

router.get("/sales/n", resumenCtlr.getNSales)

module.exports = router