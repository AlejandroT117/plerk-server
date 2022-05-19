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
    let countDocs = 0;
    fs.createReadStream(csvFile)
      .pipe(csv())
      .on("data", async (data) => {
        try {
          //date format
          data.company_id = await enterpriseModel.getbyName(data.company);
          data.date = moment(data.date, "YYYY-MM-DD H:mm:ss.SSSSSSZ").unix();
          //final_payment
          data.final_payment = data.status_transaction == 'closed' && data.status_approved=='true' ? data.price : '';

          await this.model.create(data);
          countDocs++;
          console.log(`${countDocs} documentos creados`);
        } catch (e) {
          console.log(`Load transactions data error ${e}`);
        }
      });
  }

  async getAll(orderBy = "", search = "") {
    try {
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
    } catch (e) {
      return e;
    }
  }

  async getNSales(status_transaction, order = -1, limit) {
    //order=-1 de mayor a menor / +1 de menor a mayor
    try {
      let companies = [];
      if (status_transaction) {
        companies = await this.model.aggregate([
          {
            $match: { status_transaction },
          },
          {
            $group: { _id: "$company", count: { $sum: 1 } },
          },
          {
            $sort: { count: Number(order), _id: -Number(order) },
          },
        ]);
      } else {
        companies = await this.model.aggregate([
          {
            $group: { _id: "$company", count: { $sum: 1 } },
          },
          {
            $sort: { count: Number(order), _id: -Number(order) },
          },
        ]);
      }
      if (limit) {
        return companies.slice(0, +limit);
      }
      return companies;
    } catch (e) {
      return e;
    }
  }

  async getEarningsByCompany(status_transaction = "closed", order = -1) {
    try {
      const companies = await this.model.aggregate([
        {
          $match: { status_transaction },
        },
        {
          $group: { _id: "$company", total: { $sum: "$final_payment" } },
        },
        {
          $sort: { total: Number(order), _id: -Number(order) },
        },
      ]);

      return companies;
    } catch (e) {
      return e;
    }
  }

  async getEarningsByStatus(status_transaction, final_payment = false) {
    try {
      const filter_sum = final_payment=='true'? 'final_payment': 'price';

      const earnings = await this.model.aggregate([
        {
          $group: {
            _id: "$status_transaction",
            totalEarnings: { $sum: `$${filter_sum}` },
          },
        },
      ]);

      if (status_transaction) {
        return earnings.filter((data) =>  data._id === status_transaction);
      }

      return earnings;
    } catch (e) {
      return e;
    }
  }

  async getNStatusByCompany(order = -1, status_transaction = "reversed") {
    try {
      const companies = await this.model.aggregate([
        {
          $match: { status_transaction},
        },
        {
          $group: {
            _id: "$company",
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: Number(order), _id: -Number(order) },
        },
      ]);

      return companies;
    } catch (e) {
      return e;
    }
  }

  async getTransactionsOfCompany(
    company_id,
    final_payment=false,
    status_transaction,
    order = -1
  ) {
    try {
      if(final_payment!='true'){
        const company = await this.model.aggregate([
          {
            $match: { company_id: Types.ObjectId(company_id) },
          },
          {
            $group: {
              _id: "$status_transaction",
              count: { $sum: 1 }
            }
          },
          {
            $sort: { count: Number(order), _id: -Number(order) },
          }
        ]);

        if(status_transaction){
          const status_company = company.find(data => data.status_transaction == status_transaction)

          return status_company
        }
        return company
      }

      const company = await this.model.aggregate([
        {
          $match: { company_id: Types.ObjectId(company_id) },
        },
        {
          $match: { final_payment: {$ne:null} },
        },
        {
          $group: {
            _id: "$status_transaction",
            count: { $sum: 1 },
          }
        },
        {
          $sort: { count: Number(order), _id: -Number(order) },
        }
      ]);

      return company;
    } catch (e) {
      return e;
    }
  }
}

module.exports = new Transaction();
