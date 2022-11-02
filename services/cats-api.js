const { default: axios } = require("axios");
require('dotenv').config()
const baseURL = require('../src/utils/base-url');
const imageLimit = 9;
const apiKey = process.env.API_KEY;

async function suggested(entry) {
  let results = { data: null, error: null };
  try {
    const { data } = await axios.get(`${baseURL}/breeds/search?q=${entry}`, {headers: {'x-api-key': apiKey}});
    results.data = data;
  }catch(error) {
    results.error = error.response.data;
  }
  return results;
}

async function fetchBreed(breedId) {
  let results = { data: null, error: null };
  try {
    const { data } = await axios.get(`${baseURL}/images/search?breed_ids=${breedId}&limit=${imageLimit}`, {headers: {'x-api-key': apiKey}});
    results.data = data;
  } catch(error) {
    results.error = error.response.data;
  }
  return results;
}

module.exports = { 
  suggested,
  fetchBreed
}