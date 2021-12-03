const { default: axios } = require("axios");
const baseURL = require('../utils/base-url');

async function search(parent, args, context, info) {

  try {
    const { data } = await axios.get(`${baseURL}/breeds/search?q=${args.entry}`);
    
    const suggestedCats = data.map(cat => ({id: cat.id, catName: cat.name}));

    return suggestedCats;
    
  } catch(error) {
    console.log(error.response);
    return;
  }
}

module.exports = { search }