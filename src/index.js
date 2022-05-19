const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const PORT = process.env.PORT || 8080;

//routes
const transactionsRouter = require("./routes/transactions.routes");
const enterprisesRouter = require("./routes/enterprises.routes");
const { json, urlencoded } = require("express");
//mongo connection
const { HOSTNAME, SCHEMA, DATABASE, USER, PASSWORD, OPTIONS } =
  require("./config").mongoConfig;
let MONGO_URI = "mongodb://localhost:27017/plerk";

if (process.env.NODE_ENV === "production") {
  MONGO_URI = `${SCHEMA}://${USER}:${PASSWORD}@${HOSTNAME}/${DATABASE}?${OPTIONS}`;
}

//models to load data
const enterpriseModel = require('./models/entreprise.model');
const transactionModel = require('./models/trans.model');
const unique_enterprises = require('./data/entreprises');

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log(`Mongo connected to: ${MONGO_URI}`);
    //adding array of unique enterprises
    /* const new_enterprises = await enterpriseModel.loadEnterprises(unique_enterprises)
    console.log(new_enterprises) */
    //adding new transactions
    /* transactionModel.loadData(path.join(__dirname, './data/test_database.csv')) */

    app.use(json());
    app.use(urlencoded({ extended: true }));
    app.use(
      "/static/",
      express.static(path.join(__dirname, "../build/static"))
    );
    app.use("/static/", express.static(path.join(__dirname, "../build")));

    app.use((req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      );
      if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
      }
      next();
    });

    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "../build/index.html"));
    });

    app.use("/api/transactions", transactionsRouter);
    app.use("/api/enterprises", enterprisesRouter);

    app.listen(PORT, () =>
      console.log(`Listening on: http://localhost:${PORT}`)
    );
  } catch (e) {
    console.log(`Bad connection  ${e}`);
  }
})();
