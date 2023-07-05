const axios = require('axios');

const getApi = (searchCity) => {
  const api = "dcacd0a4570dc5ec107bc3b2a116c57f";
  const post = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${api}`;
  return axios.get(post)
}

module.exports = getApi;
