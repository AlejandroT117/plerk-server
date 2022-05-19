const enterpriseModel = require("../models/entreprise.model");
const transactionModel = require("../models/trans.model");

module.exports = {
  getByName: async (req, res) => {
    const { name } = req.query;
    const enterprise = await enterpriseModel.getbyName(name);

    res.send(enterprise);
  },
  getById: async (req, res) => {
    const { id } = req.params;
    const enterprise = await enterpriseModel.getById(id);

    res.send(enterprise);
  },
  getTransactions: async(req,res)=>{
    const {id} = req.params;
    const enterprise = await transactionModel.getTransactionsOfCompany(id)

    res.send(enterprise)
  }
};