const axios = require("axios");

module.exports = axios.create({
  baseURL: "https://ThronesApi.com/api/v2",
});
