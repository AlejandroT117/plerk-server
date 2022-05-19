module.exports = {
  mongoConfig: {
    SCHEMA: "mongodb+srv",
    HOSTNAME: "cluster0.yi6w4.mongodb.net",
    USER: "alejandrot117",
    PASSWORD: process.env.MONGO_PWD,
    DATABASE: "plerk",
    OPTIONS: "retryWrites=true&w=majority"
  }
}