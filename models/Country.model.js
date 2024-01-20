const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const countrySchema = new Schema({
  name: {
    type: String,
    unique: true,
  },
});

const Country = mongoose.model("Country", countrySchema);

module.exports = Country;
