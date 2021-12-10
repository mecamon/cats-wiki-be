const { default: axios } = require("axios");
const baseURL = require('../src/utils/base-url');
const imageLimit = 9;

async function suggested(entry) {
  let results = { data: null, error: null };
  try {
    const { data } = await axios.get(`${baseURL}/breeds/search?q=${entry}`);
    results.data = data;

  }catch(error) {
    results.error = error.response.data;
  }
  return results;
}

async function fetchBreed(breedId) {
  let results = { data: null, error: null };
  try {
    const { data } = await axios.get(`${baseURL}/images/search?breed_ids=${breedId}&limit=${imageLimit}`);
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