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
  getTransactionsOfCompany: async (req, res) => {
    const { id } = req.params;
    const { final_payment } = req.query;
    const enterprise = await transactionModel.getTransactionsOfCompany(
      id,
      final_payment
    );

    res.send(enterprise);
  },
  getNTransactionsByDate: async (req, res) => {
    const { id } = req.params;
    const { order, only_one } = req.query;

    const dates = await transactionModel.getNTransactionsByDate(id, order);

    if (only_one == "true") {
      res.send(dates[0]);
      return;
    }

    res.send(dates);
  },
};
