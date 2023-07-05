const mongoose = require("mongoose");

const weatherSchema = new mongoose.Schema({
  city_name: {
    type: String,
    required: true,
  },
  temp: {
    type: String,
    required: true,
  },
  weather_nature: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("weather", weatherSchema);