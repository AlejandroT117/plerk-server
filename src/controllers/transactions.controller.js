const transactionModel = require("../models/trans.model");

module.exports = {
  getNSales: async (req, res) => {
    const { status_trans, order, limit } = req.query;

    const companies = await transactionModel.getNSales(
      status_trans,
      order,
      limit
    );

    res.send(companies);
  },
  getEarningsByCompany: async (req, res) => {
    const { status_trans, order } = req.query;

    const enterprise = await transactionModel.getEarningsByCompany(status_trans, order)

    res.send(enterprise)
  },
  getEarningsByStatus: async (req, res) => {
    const { status_trans, final_payment, match_status, only_total} = req.query;

    const earnings = await transactionModel.getEarningsByStatus(status_trans, final_payment,  match_status);
    if(only_total){
      const total = earnings.reduce((total, curr)=> total + curr.totalEarnings, 0)
      res.send({total})
      return
    }
    res.send(earnings)
  },
  getNStatusByCompany: async(req,res)=>{
    const {status_trans, order, only_first} = req.query;

    const companies = await transactionModel.getNStatusByCompany(order, status_trans);

    if(only_first){
      res.send(companies[0])
      return
    }
    res.send(companies)
  },
};