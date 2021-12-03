const orm = require('./orm-client');
const ormClient = orm.getClient();

async function getPopularBreeds() {
  return await ormClient.mostSearched.findMany();
}

async function getBreed(breedId) {
  return await ormClient.mostSearched.findUnique({
    where: {
      originalId: breedId
    }
  });
}

async function upsertPopularBreeds(breed) {

  const { timesSearched } = await getBreed(breed.id)

  const cat = await ormClient.mostSearched.upsert({
    where: {
      originalId: breed.id,
    },
    update: {
      timesSearched: timesSearched + 1
    },
    create: {
      originalId: breed.id,
      name: breed.name,
      timesSearched: 1
    }
  });

  return cat.id;
}

module.exports = {
  getPopularBreeds,
  getBreed,
  upsertPopularBreeds
}