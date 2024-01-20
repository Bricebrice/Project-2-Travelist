const axios = require("axios");
const mongoose = require("mongoose");
const Country = require("../models/Country.model");

require("dotenv").config();

const MONGO_URI =
  process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/travelist";
// console.log("mongodb_uri ", MONGO_URI);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Connection to DB successful");

    // Get data from the API and seed MongoDB
    getCountryInfo();
  })
  .catch((err) => console.log(err));

const getCountryInfo = () => {
  axios
    .get("https://restcountries.com/v3.1/all")
    .then((response) => {
      const countries = response.data.map((country) => ({
        name: country.name.common,
      }));

      // Save country information to MongoDB
      Country.insertMany(countries)
        .then(() => {
          console.log("Data seeded successfully.");
          mongoose.connection.close();
        })
        .catch((err) => {
          console.log("Error seeding data:", err);
          mongoose.connection.close();
        });
    })
    .catch((err) => {
      console.log("Error fetching data from API:", err);
      mongoose.connection.close();
    });
};
