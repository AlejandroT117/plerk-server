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

  async getAll() {
    return await this.model.find({});
  }
}

module.exports = new Transaction();
