const router = require('express').Router()

const resumenCtlr = require('../controllers/transactions.controller')

router.get("/", resumenCtlr.mostSales)
router.get("/sales/n", resumenCtlr.getNSales)
router.get("/sales/earnings", resumenCtlr.getEarningsByStatus)
router.get("/sales/enterprise", resumenCtlr.getEarningsByCompany)
router.get("/sales/enterprise/status", resumenCtlr.getEarningsByCompanyAndStatus)

module.exports = router