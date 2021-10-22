const dbConfig = require("../config/db.config")

const mongoose = require("mongoose")
mongoose.Promise = global.Promise

const db = {}
db.mongoose = mongoose
db.url = dbConfig.url
db.travel_info = require("./country.model")(mongoose)

module.exports = db