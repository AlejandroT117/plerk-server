const router = require('express').Router()

const resumenCtlr = require('../controllers/transactions.controller')

router.get("/", resumenCtlr.mostSales)

module.exports = router