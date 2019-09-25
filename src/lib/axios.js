const axios = require('axios')

exports.api = (url) => axios.create({
  baseURL: url,
  timeout: 7000,
  withCredentials: true,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})
