const transactionModel = require("../models/trans.model");


module.exports = {
  mostSales: (req, res) => {
    res.send("Hola Mundo");
  },
  
  getNSales: async(req,res)=>{
    const {status_trans, order, limit} = req.query

    const companies = await transactionModel.getNSales(status_trans, order, limit)

    res.send(companies)
  }
};
