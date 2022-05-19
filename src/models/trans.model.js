const { Schema, model, Types, default: mongoose } = require("mongoose");
const moment = require("moment");
const fs = require("fs");
const csv = require("csv-parser");
const enterpriseModel = require("./entreprise.model");

class Transaction {
  constructor() {
    const schema = new Schema({
      company_id: Types.ObjectId,
      company: String,
      price: Number,
      date: Number,
      status_transaction: String,
      status_approved: Boolean,
      final_payment: Number,
      created: { type: Date, default: Date.now },
    });

    this.model = model("transaction", schema);
  }

  loadData(csvFile) {
    let countDocs = 0
    fs.createReadStream(csvFile)
      .pipe(csv())
      .on("data", async (data) => {
        try{
          data.company_id = await enterpriseModel.getbyName(data.company);
          data.date = moment(data.date, "YYYY-MM-DD H:mm:ss.SSSSSSZ").unix()
          await this.model.create(data);
          countDocs++
          console.log(`${countDocs} documentos creados`)
        }catch(e){
          console.log(`Load transactions data error ${e}`)
        }
      });
  }

  async getAll(orderBy = "", search = "") {
    try{
      let find = search ? { email: { $regex: search, $options: "i" } } : {};
      let transactions = {};
      if (orderBy) {
        const SORT = {};
        SORT[orderBy] = 1;
        transactions = await this.model.find(find).sort(SORT);
      } else {
        transactions = await this.model.find(find);
      }

      return transactions;
    }catch(e){
      return e
    }
  }
  

  async getNSales(status_transaction='closed', order=-1, limit){

    //order=-1 de mayor a menor / +1 de menor a mayor
    try{
      const companies = this.model.aggregate([
        {
          $match: {status_transaction: status_transaction}
        },
        {
          $group: {_id: "$company", count: { $sum: 1 } }
        },
        {
          $sort: { count: Number(order), _id: 1 },
        }
      ])
      if(limit){
        return companies.limit(Number(limit))
      }
      return companies
    }catch(e){
      return e
    }
  }

  async getEarningsByCompany(status_transaction='close'){
    try{
      const companies = this.model.aggregate([
        {
          $match: {status_transaction: 'closed'}
        },
        {
          $group: {_id: "$company", total: {$sum: "$price"}}
        }
      ])

      return companies
    }catch(e){
      return e
    }
  }
}

module.exports = new Transaction();
