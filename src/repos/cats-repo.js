const orm = require('./orm-client');

const ormClient = orm.getClient();

async function getMostSearchedCats() {
  return await ormClient.mostSearched.findMany();
}

module.exports = {
  getMostSearchedCats
}