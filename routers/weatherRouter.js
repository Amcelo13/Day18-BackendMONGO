const express = require("express");
const router = express.Router();
const getWeatherApiFunction = require("../../src/services/getApi");
const weatherSchema = require("../model/Weather");

router.post("/weather", async (req, res) => {
  let { cityName } = req.body;

  try {
    const response = await getWeatherApiFunction(cityName.toLowerCase());
    console.log(response.data); // Logging the response data
    // res.send(response.data);

    const mongofetchedWeather = await weatherSchema.find({
      city_name: cityName.toLowerCase(),
    });
      console.log(mongofetchedWeather); //
    //if city not found
    if (mongofetchedWeather.length === 0) {
      const weatherOFaCity = new weatherSchema({
        city_name: cityName.toLowerCase(),
        temp: response?.data?.main.temp - 273,
        weather_nature: response?.data?.weather[0].main,
        country: response?.data?.sys?.country,
        icon: response?.data?.weather[0]?.icon,
      });
     const answer =  await weatherOFaCity.save();
      res.status(200).json(answer); //sending json data to the frontend

      
      //if city found
    } else {
      const answer1 = await weatherSchema.findByIdAndUpdate( mongofetchedWeather[0].id,{
          city_name: cityName,
          temp: response?.data?.main.temp - 273,
          weather_nature: response?.data?.weather[0].main,
          country: response?.data?.sys?.country,
          icon: response?.data?.weather[0]?.icon,
        } 
      );
      
      res.status(200).json(answer1);
    }
    // console.log(mongofetchedWeather[0]); // Logging the
    // res.status(200).send(mongofetchedWeather[0]);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
});

module.exports = router;
